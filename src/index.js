import fs from 'fs';
import p from 'path';

function endsWith(str, search) {
  return str.indexOf(search, str.length - search.length) !== -1;
}

export default function({ types: t }) {
  return {
    visitor: {
      ImportDeclaration: {
        exit: function(path, state) {
          const node = path.node;

          if (endsWith(node.source.value, '.html')) {
            const dir = p.dirname(p.resolve(state.file.opts.filename));
            const absolutePath = p.resolve(dir, node.source.value);

            const html = fs.readFileSync(absolutePath, 'utf8');

            path.replaceWith(
              t.variableDeclaration('var', [
                t.variableDeclarator(
                  t.identifier(node.specifiers[0].local.name),
                  t.stringLiteral(html)
                )
              ])
            );
          }
        }
      },
      CallExpression: {
        exit: function(path, state) {
          const node = path.node;
          const callee = path.get('callee');
          if (callee.isIdentifier() && callee.equals('name', 'require')) {
            const moduleArg = path.get('arguments')[0];
            const argValue = moduleArg.node.value;
            if (moduleArg && moduleArg.isStringLiteral() && endsWith(argValue, '.html')) {
              if (path.parentPath.isVariableDeclarator()) {
                const dir = p.dirname(p.resolve(state.file.opts.filename));
                const absolutePath = p.resolve(dir, argValue);

                const html = fs.readFileSync(absolutePath, 'utf8');
                const pathSegments = argValue.split('/');
                const varName = pathSegments[pathSegments.length - 1];
                path.replaceWith(t.stringLiteral(html));
              }
            }
          }
        }
      }
    }
  };
}
