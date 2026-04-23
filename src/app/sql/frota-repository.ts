import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';


@Injectable({ providedIn: 'root' })
export class FrotaSQL {
  constructor( ) {}

  marcaSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {    

    return `select marca ||' (' || total || ')'  as marca, total as total from
            (select f.marca as marca, count(*) as total from ga_frota_ativa f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
                where f.situacao = 'A'
            and f.proprietario in ( ${empresa} )
            group by f.marca
            order by 2 desc)`;
  }

  anoSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
    return `select ano_modelo ||' (' || total || ')'  as ano_modelo, total as total from
            (select f.ano_modelo as ano_modelo, count(*) as total from ga_frota_ativa f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
                  where f.situacao = 'A'
            and f.proprietario in ( ${empresa} )
            group by f.ano_modelo)
            order by 1 desc`;
  }

  proprietarioSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
    return `select propri_legal ||' (' || total || ')'  as propri_legal, total as total from
            (select f.propri_legal as propri_legal, count(*) as total from ga_frota_ativa f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
            where f.situacao = 'A'
            and f.proprietario in ( ${empresa} )
            group by f.propri_legal)
            order by 2 desc`;
  }

  unidadeSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
    return `select unidade ||' (' || total || ')'  as unidade, total as total from
            (select f.unidade as unidade, count(*) as total from ga_frota_ativa f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
            where f.situacao = 'A'
            and f.proprietario in ( ${empresa} )
            group by f.unidade)
            order by 2 desc`;
  }

  departamentoSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
    return `select departamento ||' (' || total || ')'  as departamento, total as total from
            (select f.setor as departamento, count(*) as total from ga_frota_ativa f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
            where f.situacao = 'A'
            and f.proprietario in ( ${empresa} )
            group by f.setor)
            order by 2 desc`;
  }

  grupoSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
     return `select gerencial ||' (' || total || ')'  as gerencial, total as total from
            (select f.gerencial as gerencial, count(*) as total from ga_frota_ativa f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
            where f.situacao = 'A'
            and f.proprietario in ( ${empresa} )
            group by f.gerencial)
            order by 2 desc`;
  }

  situacaoSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
    return `select f.sitcar as sitcar, count(*) as total from ga_frota_ativa f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
           where f.proprietario in ( ${empresa} )
           group by f.sitcar
           order by 2 desc`;
  }

  faixakmSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
      //to_char(rownum,'09')||' - ' ||
    return `select faixakm|| ' (' || total || ')' as faixakm, total as total 
             from (select busca_faixakm_20(km) km_10, busca_faixakm(km) as faixakm,  count(*) as total
                    from ga_frota_ativa a
                    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = a.placa  
                    where situacao = 'A' and proprietario in ( ${empresa} )
                   group by busca_faixakm_20(km), busca_faixakm(km) order by 1) 
            `;
  }

  tabelakmSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
  
    return `select placa,faixa,km from (
    select a.placa as placa, busca_faixakm(km) as faixa, to_char(km,'99G999G999') as km
      from ga_frota_ativa a
      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = a.placa  
     where situacao = 'A' and proprietario in ( ${empresa} ) 
     order by 3 desc) where rownum<20 `;
    }

  allSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
    return `select a.*
              from GA_FROTA_ATIVA a    
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = a.placa  
            where proprietario in ( ${empresa} )`;
            
  }

  labelsSQL(): string{
    const grupo = localStorage.getItem('gerencial_db')!.toLowerCase();
    const banco = environment["banco_" + grupo as keyof typeof environment];
    return `SELECT column_name FROM all_tab_cols
            WHERE table_name = 'GA_FROTA_ATIVA' AND OWNER = '${banco}'
            ORDER BY COLUMN_ID`;
  }

  labelsSQLR(): string{
    const grupo = localStorage.getItem('gerencial_db')!.toLowerCase();
    const banco = environment["banco_" + grupo as keyof typeof environment];
    return `SELECT column_name FROM all_tab_cols
            WHERE table_name = 'GA_FROTA_ATIVA' AND OWNER = '${banco}'
            ORDER BY column_name`;
  }

  vehicleSQL(plate: string, apolice : string,): string{
    return `UPDATE cgfrota SET apolice = '${apolice}'
            WHERE placa = '${plate}' `;
  }

}
