import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ServicoSQL {
  constructor() { }

  resumoSQL(dias: number, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select sum(case when o.dtfechamento is not null then 1 else 0 end) as fechados,
              sum(case when o.dtfechamento is null then 1 else 0 end) as abertos,
              count(*) as total
              from lordserv o
              inner join cgfrota f on f.placa = o.placa
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa
              inner join cgclifor c on c.codigocli = f.codigopropri
              inner join cgmotivo m on m.codigomot = o.codigomot
              where o.staclasse in ('I','O')
              and m.staos <> 'G' 
              and trunc(o.dtabertura) >= trunc(sysdate) - ${dias}
              and f.codigopropri in  ( ${empresa} )`;
  }

  statusSQL(dias: number, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select status, count(*) as total from(
       select case when o.dtcotacao is null then 'aguardando_orcamento'
       when o.dtcotacao is not null and o.dtavaliacao is null then 'aguardando_avaliacao'
       when o.dtcotacao is not null and o.dtavaliacao is not null
       and o.dtenvioaprovcliente is not null and o.dtretornoaprovcliente is null and o.dtaprovacao is null then 'aguardando_aprovacao_cliente'
       when o.dtcotacao is not null and o.dtavaliacao is not null
       and o.dtenvioaprovcliente is not null and o.dtretornoaprovcliente is not null and o.dtaprovacao is null then 'aguardando_aprovacao'
       when o.dtcotacao is not null and o.dtavaliacao is not null
       and o.dtenvioaprovcliente is null and o.dtaprovacao is null then 'aguardando_aprovacao'
       when o.dtaprovacao is not null then 'servico_em_execucao' else 'outro' end as status
       from lordserv o
       inner join cgfrota f on f.placa = o.placa
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa
       inner join cgclifor c on c.codigocli = f.codigopropri
       inner join cggrgere g on g.codigogger = c.codigoger
       inner join cgmotivo m on m.codigomot = o.codigomot
       where o.dtfechamento is null
       and o.staclasse in ('I','O')
       and m.staos <> 'G'
       and trunc(o.dtabertura) >= trunc(sysdate) - ${dias}
       and f.codigopropri in  ( ${empresa} )) group by status`;
  }

  statusOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {


    return `select status, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by status order by 1`;
  }

  statusNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select status, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by status order by 1`;
  }

  motivoOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select motivo, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by motivo order by 1`;
  }

  motivoNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select motivo, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by motivo order by 1`;
  }

  gerencialOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select gerencial, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by gerencial order by 1`;
  }

  gerencialNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select gerencial, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by gerencial order by 1`;
  }

  IDFOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select 'IDF_GERAL',
                        100 * trunc(1 - parados / (select count(*) as qnt
                                                    from cgfrota f
                                                    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                                                '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                                               '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}'))) 
                                                                filtro on  filtro.placa = f.placa
                                                      where f.situacao = 'A'
                                                      and f.codigopropri in (${empresa})), 2) as idf
                        from (select case when (maxdt - mindt) > 0 then dias / (maxdt - mindt) else 0 end  as parados
                        from (select max(to_date(p.dt_fechamento, 'dd/mm/yyyy')) as maxdt,
                                    min(to_date(p.dt_fechamento, 'dd/mm/yyyy')) as mindt,
                                    sum(p.dias_parados_entrada) as dias
                              from PAINEL_OS p
                              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
                              where p.codigofiltro in (${empresa})
                                and to_date(p.dt_fechamento, 'dd/mm/yyyy') >=
                                    to_date('${dataInicial}', 'dd/mm/yyyy')
                                and to_date(p.dt_fechamento, 'dd/mm/yyyy') <=
                                    to_date('${dataFinal}', 'dd/mm/yyyy')) p)`;
  }

  IDFNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {


    return `select 'IDF_GERAL',
       100 * trunc(1 - parados / (select count(*) as qnt
         from cgfrota f
         inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
         '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
        '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}'))) 
         filtro on  filtro.placa = f.placa
         where f.situacao = 'A'
         and f.codigopropri in ( ${empresa} )), 2) as idf
         from (select dias / (maxdt - mindt) as parados
         from (select max(to_date(p.dt_fechamento, 'dd/mm/yyyy')) as maxdt,
         min(to_date(p.dt_fechamento, 'dd/mm/yyyy')) as mindt,
         sum(p.dias_parados_entrada) as dias
         from PAINEL_OS p
         inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
         '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
         '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
         where p.codigofiltro in ( ${empresa} )
         and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date('${dataInicial}', 'dd/mm/yyyy')
         and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date('${dataFinal}', 'dd/mm/yyyy')) p)`;
  }

  topDezOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select ROWNUM, estabelecimento, estado, atividade, qnt_os, valor from (
       select estabelecimento, estado, atividade, count(ordem_servico) as qnt_os, sum(nvl(valor_os,0)) as valor from PAINEL_OS p
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where codigofiltro in  ( ${empresa} )
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by estabelecimento, estado, atividade
       order by valor desc
       ) where ROWNUM <= 10`;
  }

  topDezNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select ROWNUM, estabelecimento, estado, atividade, qnt_os, valor
        from (select estabelecimento,    
        estado,    
        atividade,    
        count(ordem_servico) as qnt_os,    
        sum(nvl(valor_os,0)) as valor    
        from PAINEL_OS p    
        inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
        '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
        '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
        where codigofiltro in ( ${empresa})    
        and emissao_ND >= to_date('${dataInicial}', 'dd/mm/yyyy')    
        and emissao_ND <= to_date('${dataFinal}', 'dd/mm/yyyy')    
        group by estabelecimento, estado, atividade    
        order by valor desc)    
        where ROWNUM <= 10`;
  }

  estadosOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select 'BR-' || nvl(ESTADO,'SP') as estado, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by 'BR-' || nvl(ESTADO,'SP') order by 1`;
  }

  estadosNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select 'BR-' || nvl(ESTADO,'SP') as estado, count(*) as total from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       group by 'BR-' || nvl(ESTADO,'SP') order by 1`;
  }

  allOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select P.* from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa})
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy') `;
  }

  allNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select P.* from PAINEL_OS p
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')`;
  }

  labelsSQL(): string {
    const grupo = localStorage.getItem('gerencial_db')!.toLowerCase();
    const banco = environment["banco_" + grupo as keyof typeof environment];
    return `SELECT column_name FROM all_tab_cols
            WHERE table_name = 'PAINEL_OS' AND OWNER = '${banco}'
            ORDER BY COLUMN_ID`;
  }

  nomesEmpresasSQL(empresa: string, gerencial: string, contrato: string): string {
    return `select p.apelido AS apelido, p.codigocli, 'false' 
             from cgclifor p
             inner join (select cliente from table(painel_cliente('${empresa}','${gerencial}', '${contrato}')))  filtro on  filtro.cliente = p.codigocli
             where p.codigocli in  ( ${empresa} ) order by apelido`;
  }
  nomesUnidadeSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select unidade from ga_frota_ativa p
            inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and unidade is not null group by unidade order by unidade`;
  }
  nomesDepartoSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select setor from ga_frota_ativa p
              inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
               where situacao = 'A' and proprietario in ( ${empresa} ) and setor is not null group by setor order by setor`;
  }
  nomesVeiculoSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select modelo from ga_frota_ativa p
            inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and modelo is not null group by modelo order by modelo`;
  }
  nomesPlacaSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select p.placa from ga_frota_ativa p
            inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and p.placa is not null group by p.placa order by placa`;
  }
  nomesLegalSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select PROPRI_LEGAL from ga_frota_ativa p
            inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and PROPRI_LEGAL is not null group by PROPRI_LEGAL order by PROPRI_LEGAL`;
  }
  nomesTipoSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select tipo from ga_frota_ativa p
            inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and tipo is not null group by tipo order by tipo`;
  }
  nomesCCustoSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select cc from ga_frota_ativa p
            inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and cc is not null group by cc order by cc`;
  }
  nomesGerencialSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select gerencial from ga_frota_ativa p
            inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and gerencial is not null group by gerencial order by gerencial`;
  }
  nomesSituacaoSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select sitcar from ga_frota_ativa p
              inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
              where proprietario in ( ${empresa} ) and sitcar is not null group by sitcar order by sitcar`;
  }
  nomesOperacionalSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select sitopera from ga_frota_ativa p
              inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
              where situacao = 'A' and proprietario in ( ${empresa} ) and sitopera is not null group by sitopera order by sitopera`;
  }
  nomesReservaSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select Util_reserva from ga_frota_ativa p
              inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and Util_reserva is not null group by Util_reserva order by Util_reserva`;
  }
  nomesLocalSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select local from ga_frota_ativa p
              inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
           where situacao = 'A' and proprietario in ( ${empresa} ) and local is not null group by local order by local`;
  }

  nomesLocacaoSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select contratolocacao from ga_frota_ativa p
              inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where situacao = 'A' and proprietario in ( ${empresa} ) and contratolocacao is not null group by contratolocacao order by contratolocacao`;
  }

  nomesRastreamentoSQL(empresa: string, gerencial: string, contrato: string, legal: string,
    unidade: string, setor: string, tipo: string, veiculo: string, placa: string,
    gerenciado: string, ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `select contratorastreador from ga_frota_ativa p
              inner join (select placa from table(painel_veiculo('${empresa}','${gerencial}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerenciado}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
           where situacao = 'A' and proprietario in ( ${empresa} ) and contratorastreador is not null group by contratorastreador order by contratorastreador`;
  }

  EnviaVeiculoSQL(empresa: string): string {
    return `SELECT '1' as codTransmission, marca, modelo, NVL(a.ANO_MODELO, A.ANO_FABRICACAO) as anoModelo,
                decode(a.COMBUST, 'N/A', 'FLEX','ALCOOL_GAS','FLEX', a.COMBUST) as combustivel,
                a.placa as plate, a.RESPONSAVEL as name,  to_char(sysdate, 'dd/mm/yyyy') as dataInicio,
                to_char(sysdate+365, 'dd/mm/yyyy') asdataFim FROM ga_frota_ativa a
            inner join (select placa,apolice from cgfrota where situacao = 'A') f on f.placa = a.placa
            where situacao = 'A'  and modelo IS NOT NULL and A.ANO_FABRICACAO IS NOT NULL
            and a.RESPONSAVEL IS NOT NULL and f.apolice is null and a.GERENCIAL_P IN ('GENERAL MILLS', 'MADERO', 'PMI') `; //and proprietario in ( ${empresa} ) 
  }


  statusValoresOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    //trim(to_char(sum(nvl(valor_os,0)), '99G999G999D99')) AS vl_total, 

    return `select DECODE(STATUS,'ACIDENTE ','SINISTRO','MOVIMENTACAO','OUTROS','CONCESSIONÁRIA (C)','CORRETIVA',
           'ACESSORIO','OUTROS',STATUS) AS STATUS,
            trunc(sum(nvl(valor_os,0)),0) AS vl_total, 
            COUNT(ORDEM_SERVICO ) AS qnt from PAINEL_OS p
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where p.codigofiltro in  ( ${empresa} )
            and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
            and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
            group by DECODE(STATUS,'ACIDENTE ','SINISTRO','MOVIMENTACAO','OUTROS','CONCESSIONÁRIA (C)','CORRETIVA',
            'ACESSORIO','OUTROS',STATUS)`;
  }


  statusValoresOSabertaSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    //trim(to_char(sum(nvl(valor_os,0)), '99G999G999D99')) AS vl_total, 

    return `select DECODE(STATUS,'ACIDENTE ','SINISTRO','MOVIMENTACAO','OUTROS','CONCESSIONÁRIA (C)','CORRETIVA','VISTORIA','OUTROS',
                  'ACESSORIO','OUTROS',STATUS) AS STATUS,
                  trunc(sum(nvl(valor_os,0)),0) AS vl_total, 
                  COUNT(seqos ) AS qnt from PAINEL_OS_ABERTA p
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
            where p.CODIGOPROPRI in  ( ${empresa} )
              and p.dtabertura >= to_date('${dataInicial}', 'dd/mm/yyyy')            
              and p.dtabertura <= to_date('${dataFinal}', 'dd/mm/yyyy') 
            group by DECODE(STATUS,'ACIDENTE ','SINISTRO','MOVIMENTACAO','OUTROS','CONCESSIONÁRIA (C)','CORRETIVA','VISTORIA','OUTROS',
             'ACESSORIO','OUTROS',STATUS)`;
  }

  statusValoresNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select DECODE(STATUS,'ACIDENTE ','SINISTRO','MOVIMENTACAO','OUTROS','CONCESSIONÁRIA (C)','CORRETIVA',
            'ACESSORIO','OUTROS',STATUS) AS STATUS,
            sum(nvl(valor_os,0)) AS vl_total, COUNT(ORDEM_SERVICO ) AS qnt from PAINEL_OS p
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa          
            where p.codigofiltro in  ( ${empresa} )
            and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
            and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
            group by DECODE(STATUS,'ACIDENTE ','SINISTRO','MOVIMENTACAO','OUTROS','CONCESSIONÁRIA (C)','CORRETIVA',
            'ACESSORIO','OUTROS',STATUS) `;
  }

  top10PlacaOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT * FROM (
       SELECT p.placa, sum(nvl(valor_os,0) ) AS total FROM PAINEL_OS p
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa      
       where p.codigofiltro in  ( ${empresa})
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY p.PLACA ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  top10PlacaNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT * FROM (
       SELECT p.placa, sum(nvl(valor_os,0) ) AS total FROM PAINEL_OS p
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa     
       where p.codigofiltro in  ( ${empresa})
       and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY PLACA ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  top10UnidadeOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return `SELECT * FROM (
       SELECT unidade, sum(nvl(valor_os,0) ) AS total FROM PAINEL_OS p
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa   
       where p.codigofiltro in  ( ${empresa})
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY unidade ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  top10UnidadeNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT * FROM (
       SELECT unidade, sum(nvl(valor_os,0) ) AS total FROM PAINEL_OS p
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa     
       where p.codigofiltro in  ( ${empresa})
       and to_date(p.dtemissaond ,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and to_date(p.dtemissaond ,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY unidade ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  top10CorretivasOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT * FROM (
      SELECT item, trunc(sum(total),2) AS total FROM top_10_corretiva_painel p
      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
       where p.CODIGOPROPRI in  ( ${empresa})
       and p.dtfechamento >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and p.dtfechamento <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY item ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  top10CorretivasNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT * FROM (
      SELECT item, trunc(sum(total),2) AS total FROM top_10_corretiva_painel p
      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
       where p.CODIGOPROPRI in  ( ${empresa})
       and p.EMISSAO_ND >= to_date( '${dataInicial}' , 'dd/mm/yyyy'), gerencial : string, 
       ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string
       and p.EMISSAO_ND <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY item ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  top10PreventivasOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT * FROM (
      SELECT item, trunc(sum(total),2) AS total FROM top_10_preventiva_painel p
      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
       where p.CODIGOPROPRI in  ( ${empresa})
       and p.dtfechamento >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and p.dtfechamento <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY item ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  top10PreventivasNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT * FROM (
      SELECT item, trunc(sum(total),2) AS total FROM top_10_preventiva_painel p
      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
       where p.CODIGOPROPRI in  ( ${empresa})
       and p.EMISSAO_ND >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
       and p.EMISSAO_ND <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
       GROUP BY item ORDER BY 2 DESC
       ) WHERE rownum <= 10`;
  }

  economiaOSSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'YYYY') || '/' ||
            to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'MM') AS periodo,
            trunc(sum(VALOR_SOLICITADO),2) AS solicitado,
            trunc(sum(nvl(valor_os,0)),2) AS aprovado,
            trunc(sum(VALOR_SOLICITADO) - sum(nvl(valor_os,0)),2) AS economia,
            case when sum(VALOR_SOLICITADO) > 0 then ((sum(VALOR_SOLICITADO) - sum(nvl(valor_os,0))) /  sum(VALOR_SOLICITADO)) else 0 end AS economia_porcento
            FROM PAINEL_OS p
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
            where p.CODIGOFILTRO in  ( ${empresa})
            and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
            and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
            GROUP BY to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'YYYY') || '/' ||
                      to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'MM')
            order by 1`;
  }

  economiaNDSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT to_char(EMISSAO_ND, 'YYYY/MM') AS periodo,
            trunc(sum(VALOR_SOLICITADO), 2) AS solicitado,            
            trunc(sum(nvl(valor_os,0)), 2) AS aprovado,            
            trunc(sum(VALOR_SOLICITADO) - sum(nvl(valor_os,0)), 2) AS economia,            
            case when sum(VALOR_SOLICITADO) > 0 then ((sum(VALOR_SOLICITADO) - sum(nvl(valor_os,0))) /  sum(VALOR_SOLICITADO)) else 0 end AS economia_porcento
            FROM PAINEL_OS p           
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa             
            where p.CODIGOFILTRO in (${empresa})            
            and p.EMISSAO_ND >= to_date('${dataInicial}', 'dd/mm/yyyy')            
            and p.EMISSAO_ND <= to_date('${dataFinal}', 'dd/mm/yyyy')            
            GROUP BY to_char(EMISSAO_ND, 'YYYY/MM')            
            order by 1`;
  }

  economiaSUIVSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'YYYY') || '/' ||
            to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'MM') AS periodo,
            trunc(sum(nvl(VALOR_SUIV,0)),2) AS solicitado,
            trunc(sum(nvl(valor_os,0)),2) AS aprovado,
            trunc(sum(nvl(VALOR_SUIV,0)) - sum(nvl(valor_os,0)),2) AS economia,
            case when sum(nvl(VALOR_SUIV,0)) > 0 then (sum(nvl(VALOR_SUIV,0)) - sum(nvl(valor_os,0)))/sum(nvl(VALOR_SUIV,0)) else 0 end AS economia_porcento
            FROM PAINEL_OS p
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
            where p.CODIGOFILTRO in  ( ${empresa})
            and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
            and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
            GROUP BY to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'YYYY') || '/' ||
                      to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'MM')
            order by 1`;
  }

  economiaNDSUIVSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT to_char(EMISSAO_ND, 'YYYY/MM') AS periodo,
          trunc(sum(nvl(VALOR_SUIV,0)), 2) AS solicitado,            
          trunc(sum(nvl(valor_os,0)), 2) AS aprovado,            
          trunc(sum(nvl(VALOR_SUIV,0)) - sum(nvl(valor_os,0)), 2) AS economia,            
          case when sum(nvl(VALOR_SUIV,0)) > 0 then (sum(nvl(VALOR_SUIV,0)) - sum(nvl(valor_os,0)))/sum(nvl(VALOR_SUIV,0)) else 0 end  AS economia_porcento            
          FROM PAINEL_OS p           
          inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
          '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
          '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa              
          where p.CODIGOFILTRO in (${empresa})            
          and p.EMISSAO_ND >= to_date('${dataInicial}', 'dd/mm/yyyy')            
          and p.EMISSAO_ND <= to_date('${dataFinal}', 'dd/mm/yyyy')            
          GROUP BY to_char(EMISSAO_ND, 'YYYY/MM')            
          order by 1`;
  }


  economiaMEDIOSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'YYYY') || '/' ||
            to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'MM') AS periodo,
            trunc(sum(nvl(VALOR_MEDIO,0)),2) AS solicitado,
            trunc(sum(nvl(valor_os,0)),2) AS aprovado,
            trunc(sum(nvl(VALOR_MEDIO,0)) - sum(nvl(valor_os,0)),2) AS economia,
            case when sum(nvl(VALOR_MEDIO,0)) > 0 then (sum(nvl(VALOR_MEDIO,0)) - sum(nvl(valor_os,0)))/sum(nvl(VALOR_MEDIO,0)) else 0 end AS economia_porcento
            FROM PAINEL_OS p
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
            where p.CODIGOFILTRO in  ( ${empresa})
            and to_date(p.dt_fechamento,'dd/mm/yyyy') >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
            and to_date(p.dt_fechamento,'dd/mm/yyyy') <= to_date( '${dataFinal}' , 'dd/mm/yyyy')
            GROUP BY to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'YYYY') || '/' ||
                      to_char(to_date(DT_FECHAMENTO,'dd/mm/yyyy'), 'MM')
            order by 1`;
  }

  economiaNDMEDIOSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT to_char(EMISSAO_ND, 'YYYY/MM') AS periodo,
          trunc(sum(nvl(VALOR_MEDIO,0)), 2) AS solicitado,            
          trunc(sum(nvl(valor_os,0)), 2) AS aprovado,            
          trunc(sum(nvl(VALOR_MEDIO,0)) - sum(nvl(valor_os,0)), 2) AS economia,            
          case when sum(nvl(VALOR_MEDIO,0)) > 0 then (sum(nvl(VALOR_MEDIO,0)) - sum(nvl(valor_os,0)))/sum(nvl(VALOR_MEDIO,0)) else 0 end  AS economia_porcento            
          FROM PAINEL_OS p           
          inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
          '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
          '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa              
          where p.CODIGOFILTRO in (${empresa}) and VALOR_MEDIO > 0           
          and p.EMISSAO_ND >= to_date('${dataInicial}', 'dd/mm/yyyy')            
          and p.EMISSAO_ND <= to_date('${dataFinal}', 'dd/mm/yyyy')            
          GROUP BY to_char(EMISSAO_ND, 'YYYY/MM')            
          order by 1`;
  } 

  painelOSAbertaSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `Select placa, modelo, gerencial, status, status_os, estabelecimento,
                   estado, valor_solicitado, valor_os, seqos, 
                   to_char(dtabertura,'dd/mm/yyyy hh24:mi') as abertura,
                   to_char(dtliberacao,'dd/mm/yyyy hh24:mi') as liberacao,
                   to_char(dtavaliacao,'dd/mm/yyyy hh24:mi') as avaliacao,
                   to_char(dtaprovacao,'dd/mm/yyyy hh24:mi') as aprovacao,
                   to_char(dtfechamento,'dd/mm/yyyy hh24:mi') as fechamento,
                   to_char(dtentrega,'dd/mm/yyyy hh24:mi') as preventrega, dias
           from painel_os_aberta p                      
          inner join (select placa as place from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
          '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
          '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.place = p.placa              
          where p.CODIGOPROPRI in (${empresa})            
          and p.dtabertura >= to_date('${dataInicial}', 'dd/mm/yyyy')            
          and p.dtabertura <= to_date('${dataFinal}', 'dd/mm/yyyy')                  
          order by seqos`;
  }

  indicadorChamadaSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select 'Chamada Preventiva', nvl(round(sum(codigo_status)/count(*)*100,0),0) as atendida from ic_chamada_preventiva p
  inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
  '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
  '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa  
     where p.data >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
     and p.data <= to_date( '${dataFinal}' , 'dd/mm/yyyy') `;
  }

  preventivaAtrasadasSQL(empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select p.placa,p.situacao from wa_preventiva p
  inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
  '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
  '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa`;
  }

  TCOSQL(dataInicial: string, dataFinal: string, empresa: string, codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select * from table(painel_tco( to_date('${dataInicial}','dd/mm/yyyy') ,
                                            to_date('${dataFinal}','dd/mm/yyyy') ,
                                            '${empresa}','${codigogger}','${contrato}','${legal}',
                                            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')) where veiculo is not null order by total desc`;
  }

  labelsSQLR(): string {
    const grupo = localStorage.getItem('gerencial_db')!.toLowerCase();
    const banco = environment["banco_" + grupo as keyof typeof environment];
    return `SELECT column_name FROM all_tab_cols
            WHERE table_name = 'PAINEL_OS' AND OWNER = '${banco}'
            ORDER BY column_name`;
  }

  getCubosIC(codigofun: string): string {
    return `select * from painel_acesso_ic where codigofun = ${codigofun} order by codigocubo, ordem`;
  }

  getLabelCubosIc(codigocubo: string): string {
    return `select titulo from iccubocampo where codigocubo = ${codigocubo} order by ordem `;
  }

}