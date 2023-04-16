import { DataHelper } from "../helpers/DataHelper.js";
import { View } from "./View.js";

export class NegociacoesView extends View{
    template (model) {
        return `    
        <table class="table table-hover table-bordered">
            <thead>
                <tr>
                    <th data-valor="data">DATA</th>
                    <th data-valor="quantidade">QUANTIDADE</th>
                    <th data-valor="valor">VALOR</th>
                    <th data-valor="volume">VOLUME</th>
                </tr>
            </thead>
        
            <tbody data-tabela="">
                ${model.negociacoes.map(obj =>`
                        <tr>
                            <th>${DataHelper.parseString(obj.data)}</th>
                            <th>${obj.quantidade}</th>
                            <th>${obj.valor}</th>
                            <th>${obj.volume}</th>
                        </tr>
                    `
                ).join('')}
            </tbody>
                
            <tfoot>
                <td colspan="3"></td>
                <td>
                    ${model.negociacoes.reduce((total, n) => total + n.volume, 0.0)}
                </td>
            </tfoot>
            
        </table>`;
    }
}