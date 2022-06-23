const visit = require('unist-util-visit');

const importNode = {
    type: 'import',
    value: 'import { db } from "../firebase";\n    import { collection, addDoc, Timestamp } from "firebase/firestore";\n    import React from "react";\n import {  Alert,Button,ButtonGroup,Col,Container,Row,} from "react-bootstrap";\n    import { BiHappyBeaming, BiMeh, BiSad } from "react-icons/bi";',
};

const plugin = (options) => {

  const transformer = async (ast) => {
    let imported = false;
   /* if(imported === false){
        console.log('imported graphiql');
        imported=true;
    }*/


    let number = 1;
    visit(ast, 'root', (node) => {
          try{
            console.log('imported firebase, found root');
            node.unshift({
                type:'jsx',
                value:importNode
            });
          }catch(e){
            return;
          }
            
        
        
        //console.log(node.type);
        if(node.lang === 'gql'){

           // let f = node.meta.split('=')[1];
            /*node.unshift({
                type:'jsx',
                value:`<GraphiQL fetcher={createGraphiQLFetcher({
                    url: '${f}',
                })}
                editorTheme={'dracula'}
                query='${node.value.replace('<content>','').replace('</content>','')}'
            />`
            });



            node.type = 'jsx'
            node.value = `<GraphiQL fetcher={createGraphiQLFetcher({
                    url: '${f}',
                })}
                editorTheme={'dracula'}
                query='${node.value.replace('<content>','').replace('</content>','')}'
            />`;*/
        }

    });

  };
  return transformer;

};

module.exports = plugin;
