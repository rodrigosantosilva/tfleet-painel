
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class MultasSQL {

  getMultasSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select f.* from PAINEL_MULTA f
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa 
     where codigocli in ( ${empresa} )
      and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
      and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
      and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
       and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
      and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
      and to_date('${dataFinal}','dd/mm/yyyy')`;
  }
  getTipoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select tipo, count (*) as total, sum(valor) as valor from PAINEL_MULTA f
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa 
    where codigocli in ( ${empresa} )
    and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
    and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
    and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
    and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
    and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
    and to_date('${dataFinal}','dd/mm/yyyy') GROUP BY tipo`;
  }
  getReembolsoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select reembolso, count (*) as total from PAINEL_MULTA f
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa 
    where codigocli in ( ${empresa} )
    and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
    and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
    and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
    and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
    and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
    and to_date('${dataFinal}','dd/mm/yyyy') GROUP BY reembolso`;
  }
  getResumoGravidade(dias: number, empresa: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select nvl(classif,'LEVE') as tipo, count (*) as total from PAINEL_MULTA f
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa  
            where codigocli in ( ${empresa} ) and trunc(dtinfracao) >= trunc(sysdate) - ${dias}
            GROUP BY nvl(classif,'LEVE')`;
  }
  getGravidadeSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select nvl(classif,'LEVE') as tipo, count (*) as total from PAINEL_MULTA  f
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa 
    where codigocli in ( ${empresa} )
    and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
    and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
    and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
    and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
    and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
    and to_date('${dataFinal}','dd/mm/yyyy') GROUP BY nvl(classif,'LEVE') order by 2`;
  }
  getDescricaoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select CLASSIFICACAO, count (*) as total from PAINEL_MULTA  f
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa 
    where codigocli in ( ${empresa} )
    and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
    and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
    and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
    and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
    and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
    and to_date('${dataFinal}','dd/mm/yyyy') GROUP BY CLASSIFICACAO order by 2 desc`;
  }
  getMensalSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `SELECT ANO, NVL(JANEIRO,0), NVL(FEVEREIRO,0), NVL(MARCO,0), NVL(ABRIL,0), NVL(MAIO,0), NVL(JUNHO,0), NVL(JULHO,0),
       NVL(AGOSTO,0), NVL(SETEMBRO,0), NVL(OUTUBRO,0), NVL(NOVEMBRO,0), NVL(DEZEMBRO,0) FROM (
       SELECT to_char(DTINFRACAO , 'yyyy') AS ano, to_char(DTINFRACAO , 'mm') AS mes, count(*) AS total FROM PAINEL_MULTA f
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa    
       where codigocli in ( ${empresa} )
       and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
       and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
       and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
       and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
       and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
       and to_date('${dataFinal}','dd/mm/yyyy')
       GROUP BY to_char(DTINFRACAO , 'yyyy'), to_char(DTINFRACAO , 'mm')) pivot(sum(total)
       FOR mes IN ('01' AS janeiro,'02' AS fevereiro,'03' AS marco,'04' AS abril,'05' AS maio,'06' AS junho,'07' AS julho,'08' AS agosto,
       '09' AS setembro,'10' AS outubro,'11' AS novembro,'12' AS dezembro)) ORDER BY 1`;
  }
  getMensalValorSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select * from (SELECT ANO, 'Vlr R$' as Unidade,trim(to_char(JANEIRO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as JANEIRO, trim(to_char(FEVEREIRO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as FEVEREIRO, 
                  trim(to_char(MARCO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as MARCO, trim(to_char(ABRIL, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as ABRIL, 
                  trim(to_char(MAIO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as MAIO, trim(to_char(JUNHO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as JUNHO, 
                  trim(to_char(JULHO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as JULHO, trim(to_char(AGOSTO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as AGOSTO, 
                  trim(to_char(SETEMBRO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as SETEMBRO, trim(to_char(OUTUBRO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as OUTUBRO, 
                  trim(to_char(NOVEMBRO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as NOVEMBRO, trim(to_char(DEZEMBRO, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as DEZEMBRO
     FROM (
       SELECT to_char(DTINFRACAO , 'yyyy') AS ano, to_char(DTINFRACAO , 'mm') AS mes, sum(valor) AS total FROM PAINEL_MULTA f
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa    
       where codigocli in ( ${empresa} )
       and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
       and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
       and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
       and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
       and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
       and to_date('${dataFinal}','dd/mm/yyyy')
       GROUP BY to_char(DTINFRACAO , 'yyyy'), to_char(DTINFRACAO , 'mm')) pivot(sum(total)
       FOR mes IN ('01' AS janeiro,'02' AS fevereiro,'03' AS marco,'04' AS abril,'05' AS maio,'06' AS junho,'07' AS julho,'08' AS agosto,
       '09' AS setembro,'10' AS outubro,'11' AS novembro,'12' AS dezembro)) 
       union all
       SELECT ANO, 'Qtde' as unidade,to_char(NVL(JANEIRO,0)), to_char(NVL(FEVEREIRO,0)), to_char(NVL(MARCO,0)), to_char(NVL(ABRIL,0)), 
       to_char(NVL(MAIO,0)), to_char(NVL(JUNHO,0)), to_char(NVL(JULHO,0)),to_char(NVL(AGOSTO,0)), to_char(NVL(SETEMBRO,0)),
        to_char(NVL(OUTUBRO,0)), to_char(NVL(NOVEMBRO,0)), to_char(NVL(DEZEMBRO,0)) FROM (
       SELECT to_char(DTINFRACAO , 'yyyy') AS ano, to_char(DTINFRACAO , 'mm') AS mes, count(*) AS total FROM PAINEL_MULTA f
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa    
       where codigocli in ( ${empresa} )
       and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
       and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
       and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
       and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
       and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
       and to_date('${dataFinal}','dd/mm/yyyy')
       GROUP BY to_char(DTINFRACAO , 'yyyy'), to_char(DTINFRACAO , 'mm')) pivot(sum(total)
       FOR mes IN ('01' AS janeiro,'02' AS fevereiro,'03' AS marco,'04' AS abril,'05' AS maio,'06' AS junho,'07' AS julho,'08' AS agosto,
       '09' AS setembro,'10' AS outubro,'11' AS novembro,'12' AS dezembro))) order by 1,2 `;
  }
  getTop10(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

                  //trim(to_char(sum(valor), '99G999G999D99')) as valor  sum(valor) as valor 
    return `SELECT * FROM (
       SELECT NOME, SUM(PONTUACAO) AS PONTOS,trim(to_char(sum(valor), '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as valor  FROM PAINEL_MULTA f
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa    
       where codigocli in ( ${empresa} )
       and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
       and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
       and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
       and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
       and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
       and to_date('${dataFinal}','dd/mm/yyyy')
       GROUP BY NOME
       ORDER BY 2 DESC
       ) WHERE ROWNUM <= 20`;
  }
  getQtde10SQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `SELECT * FROM (
    SELECT f.placa, count(*) AS quantidade,trim(to_char(sum(valor), '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as valor  FROM PAINEL_MULTA f
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa 
    where codigocli in ( ${empresa} )
    and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
    and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
    and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
    and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
    and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
    and to_date('${dataFinal}','dd/mm/yyyy')
    GROUP BY f.placa
    ORDER BY 2 DESC
    ) WHERE ROWNUM <= 20`;
  }
  getGravissima(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

      //AND (CLASSIFICACAO LIKE '%DIRIGIR%LCOOL%' OR
      //CLASSIFICACAO LIKE '%TRANSPOR%BLOQUEIO%' OR
      //CLASSIFICACAO LIKE '%VEL%SU%MAIS%50%' OR
      //CLASSIFICACAO LIKE '%RECUSA%BAF%')

    return `SELECT f.PLACA,
                    NOME,
                    TO_CHAR(DTINFRACAO, 'DD/MM/YYYY') AS DATA,
                    TO_CHAR(dtnotificacao, 'DD/MM/YYYY') AS VENC_NOTIFICA,
                    CLASSIFICACAO,
                    classif
       FROM PAINEL_MULTA f
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa    
       where codigocli in ( ${empresa} )
       and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
       and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
       and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
       and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
       and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
       and to_date('${dataFinal}','dd/mm/yyyy')
       and dtnotificacao > sysdate and tipo = 'NOTIFICAÇÃO'      
       ORDER BY DTINFRACAO`;
  }
  getEstados(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {


    return `SELECT 'BR-' || nvl(ESTADO,'SP'), count(*) as total
       FROM PAINEL_MULTA f     
       inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
       '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
       '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa    
       where codigocli in ( ${empresa} )
       and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
       and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
       and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
       and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
       and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
       and to_date('${dataFinal}','dd/mm/yyyy')
       GROUP BY 'BR-' || nvl(ESTADO,'SP')`;
  }
  allSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select INFRACAO, POSICAO , to_char(DTINFRACAO ,'dd/mm/yyyy hh24:mi') AS dtinfracao,
            TO_CHAR(dtnotificacao, 'DD/MM/YYYY') AS VENC_NOTIFICA,
            f.placa, tipo, classif, enquadramento, classificacao, pontuacao, nome, codigocli,
            GERENCIAL, ESTADO , trim(to_char(VALOR, '99G999G999D99', 'NLS_NUMERIC_CHARACTERS = '',.''')) as  VALOR, 
            TO_CHAR(DTLANCAMENTO ,'dd/mm/yyyy hh24:mi') AS dtlancamento
            from PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy')`;
  }
  filterTipoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select tipo
            from PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy') and tipo is not null
            group by tipo`;
  }
  filterGravidadeSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select classif
            from PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy') and classif is not null
            group by classif`;
  }
  filterDescricaoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select classificacao
            from PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy') and classificacao is not null
            group by classificacao`;
  }  
  filterReembolsoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select reembolso
            from PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy')  and reembolso is not null
            group by reembolso`;
  }  
  getDepartoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select a.setor as departamento, 
                  count(*) as quantidade
            from PAINEL_MULTA f
           inner join ga_frota_ativa a on a.placa = f.placa
           inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
           '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
           '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
           where codigocli in ( ${empresa} )
           and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
           and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
           and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
           and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
           and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
           and to_date('${dataFinal}','dd/mm/yyyy')
           group by a.setor order by 2 desc`;
  }
  getUnidadeSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select a.unidade as unidade, 
                count(*) as quantidade
              from PAINEL_MULTA f
              inner join ga_frota_ativa a on a.placa = f.placa
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
              where codigocli in ( ${empresa} )
              and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
              and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
              and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
              and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
              and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
              and to_date('${dataFinal}','dd/mm/yyyy')              
              group by a.unidade order by 2 desc`;
  }
  getEmpresaSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `select a.PROPRI_FANTASIA as empresa, 
                count(*) as quantidade
              from PAINEL_MULTA f
              inner join ga_frota_ativa a on a.placa = f.placa
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
              where codigocli in ( ${empresa} )
              and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
              and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
              and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
              and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
              and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
              and to_date('${dataFinal}','dd/mm/yyyy')              
              group by a.PROPRI_FANTASIA order by 2 desc`;
  }
  labelsSQL(): string {
    const grupo = localStorage.getItem('gerencial_db')!.toLowerCase();
    const banco = environment["banco_" + grupo as keyof typeof environment];
    return `SELECT column_name FROM all_tab_cols
            WHERE table_name = 'PAINEL_MULTA' AND OWNER = '${banco}'
            ORDER BY COLUMN_ID`;
  }
  getValorTipoSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `SELECT nvl(TIPO, 'MULTA') AS TIPO,  sum(VALOR) AS VALOR, count(*) as QUANTIDADE
            FROM PAINEL_MULTA  f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy')
            GROUP BY nvl(TIPO, 'MULTA')`;
  }
  getTop10PlacaValorSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {

    return `SELECT * FROM (
            SELECT f.PLACA, sum(VALOR) AS VALOR
            FROM PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy')
            GROUP BY f.PLACA ORDER BY 2 DESC
            ) WHERE rownum <= 10`;
  }
  getTop10ClassificacaoValorSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string ): string {


    return `SELECT * FROM (
            SELECT CLASSIFICACAO, sum(VALOR) AS VALOR
            FROM PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy')
            GROUP BY CLASSIFICACAO ORDER BY 2 DESC
            ) WHERE rownum <= 10`;
  }
  getTempoDiaSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string): string {


    return `select to_char(dtinfracao,'D')||' - '||decode(to_char(dtinfracao,'D'),1,'Domingo',2,'Segunda-feira',3,'Terça-feira',4,'Quarta-feira',5,'Quinta-feira',6,'Sexta-feira',7,'Sabado') as dia_semana,
                   count(*) as quantidade
            from PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy')
            and dtinfracao is not null
          group by to_char(dtinfracao,'D')
          order by 1`;
  } 
  getTempoHoraSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string,
    Tipomul: string, Gravidademul: string, descricaomul: string, reembolsomul: string): string {


    return `select to_char(dtinfracao,'HH24') as dia_hora,  count(*) as quantidade
            from PAINEL_MULTA f
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = f.placa         
            where codigocli in ( ${empresa} )
            and (f.tipo in (select column_value  from table(split('${Tipomul}',',')))   or nvl('${Tipomul}','vazio') in 'vazio')
            and (f.classif in (select column_value  from table(split('${Gravidademul}',',')))   or nvl('${Gravidademul}','vazio') in 'vazio')
            and (f.classificacao in (select column_value  from table(split('${descricaomul}',',')))   or nvl('${descricaomul}','vazio') in 'vazio')
            and (f.reembolso in (select column_value  from table(split('${reembolsomul}',',')))   or nvl('${reembolsomul}','vazio') in 'vazio')
            and trunc(dtinfracao) between to_date('${dataInicial}','dd/mm/yyyy')
            and to_date('${dataFinal}','dd/mm/yyyy')
          group by to_char(dtinfracao,'HH24')
          order by 1`;
  }
 


// ------------------------------------------------------------------ //
//                      TELEMETRIA                                    //  
// ------------------------------------------------------------------ //


  allTelemetriaSQL(dataInicial: string, dataFinal: string, empresa: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select PLACA,MARCA,MODELO,TIPO,EMPRESA,UNIDADE,DEPARTAMENTO,
                   OPERACAO,STATUS,to_char(DATA,'dd/mm/yyyy') as DATA,
                   KMATUAL,UTILIZACAO,PERCORRIDO,PROCESSOS
            from PAINEL_TELEMETRIA  f
            inner join (select placa  as place from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.place = f.placa         
             where  trunc(DATA) >= to_date( '${dataInicial}' , 'dd/mm/yyyy')
            and trunc(DATA) <= to_date( '${dataFinal}' , 'dd/mm/yyyy')`;
  }
  getTiposRSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select * from (select sum(notif_total) as total,
                 count(distinct t.placa) as veiculos,
                 sum(notif_Parado) as notif_Parado,
                 sum(notif_Veloci) as notif_Veloci,
                 sum(notif_Freada) as notif_Freada,
                 sum(notif_Rotacao) as notif_Rotacao
            from VW_PAINEL_TELEMETRIA t 
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa         
            where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
            and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
            and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy') )       
         unpivot(TOTAL for TIPO in ("TOTAL", "VEICULOS", "NOTIF_PARADO", "NOTIF_VELOCI", "NOTIF_FREADA", "NOTIF_ROTACAO"))`;
  }
  getMensalRSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select to_char(t.data,'yyyy/mm') as mes, sum(notif_total) as total,
                 count(distinct t.placa) as veiculos,
                 sum(notif_Parado) as notif_Parado,
                 sum(notif_Veloci) as notif_Veloci,
                 sum(notif_Freada) as notif_Freada,
                 sum(notif_Rotacao) as notif_Rotacao,
                 sum(notif_Motorista) as notif_Motorista
            from VW_PAINEL_TELEMETRIA t 
           inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa         
            where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
            and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
            and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy') 
            group by to_char(t.data,'yyyy/mm')  order by 1`;
  }
  gettop10paradoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select placa,qtde from (select t.placa||' - '||upper(a.tipo) as placa,sum(notif_parado) as qtde 
            from VW_PAINEL_TELEMETRIA t 
            inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
            where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
            and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
            and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy') 
            group by t.placa,a.tipo order by 2 desc) where rownum <= 10`;
  }
  gettop10excessoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select * from (select t.placa||' - '||upper(a.tipo) as placa,sum(notif_Veloci) as qtde 
            from VW_PAINEL_TELEMETRIA t 
            inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
            where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
            and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
            and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy') 
            group by t.placa,a.tipo order by 2 desc) where rownum <= 10`;
  }
  gettop10freadasSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select * from (select t.placa||' - '||upper(a.tipo) as placa,sum(notif_Freada) as qtde 
            from VW_PAINEL_TELEMETRIA t 
            inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
            where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
            and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
            and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy') 
            group by t.placa,a.tipo order by 2 desc) where rownum <= 10`;
  }

  gettop10notificaSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select placa,tipo,unidade,setor,operacao,parado,velocidade,freada
            from (select placa,tipo,unidade,setor,operacao,
                  sum(case when tipos = 'parado' then qtde end) as parado,
                  sum(case when tipos = 'velocidade' then qtde end) as velocidade,
                  sum(case when tipos = 'freada' then qtde end) as freada,
                  sum(qtde) as base
              from (select placa,tipo,unidade, setor,operacao,qtde,'parado' as tipos
                    from (select t.placa,
                                  upper(a.tipo) as tipo,
                                  upper(a.unidade) as unidade,
                                  upper(a.setor) as setor,
                                  upper(sitopera) as operacao,
                                  sum(notif_parado) as qtde
                            from VW_PAINEL_TELEMETRIA t
                            inner join (select placa, tipo, unidade, setor, sitopera
                                        from ga_frota_ativa
                                        where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                           inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                        '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                        '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                           where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
                             and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
                             and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy')
                            group by t.placa, a.tipo, unidade, setor, sitopera
                            order by 6 desc)
                    where rownum <= 10
                  union all
                  select placa,tipo,unidade, setor,operacao,qtde,'velocidade' as tipos
                    from (select t.placa,
                                  upper(a.tipo) as tipo,
                                  upper(a.unidade) as unidade,
                                  upper(a.setor) as setor,
                                  upper(sitopera) as operacao,
                                  sum(notif_Veloci) as qtde
                            from VW_PAINEL_TELEMETRIA t
                            inner join (select placa, tipo, unidade, setor, sitopera
                                          from ga_frota_ativa
                                          where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                          '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                          '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                            where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
                              and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
                              and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy')
                            group by t.placa, a.tipo, unidade, setor, sitopera
                            order by 6 desc)
                    where rownum <= 10
                  union all
                  select  placa,tipo,unidade, setor,operacao,qtde, 'freada' as tipos
                    from (select t.placa,
                                  upper(a.tipo) as tipo,
                                  upper(a.unidade) as unidade,
                                  upper(a.setor) as setor,
                                  upper(sitopera) as operacao,
                                  sum(notif_Freada) as qtde
                            from VW_PAINEL_TELEMETRIA t
                            inner join (select placa, tipo, unidade, setor, sitopera
                                          from ga_frota_ativa
                                          where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                          '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                          '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                            where t.situacao = 'A' and t.codigofiltro in ( ${empresa} ) 
                              and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')
                              and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy')
                            group by t.placa, a.tipo, unidade, setor, sitopera
                            order by 6 desc)
                    where rownum <= 10)
              group by placa, tipo, unidade, setor, operacao
              order by base desc)`;
  }



  getQuantitativoRSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string, base: string): string {
    if (base === 'VALE' || base === 'vale') {
      return `SELECT 'Frota' as tipo ,count(t.placa) AS TOTAL
              FROM ga_frota_ativa t
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
              WHERE situacao = 'A'
              union all
              SELECT 'Ativo' as tipo, COUNT(DISTINCT t.placa) AS TOTAL
              from VW_PAINEL_VIAGEM t
              inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa 
              where t.placa is not null and dtchegada is not null 
                and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
              union all
              SELECT 'Falha' as tipo, 0 from dual `;

    } else {
      return `SELECT 'Frota' as tipo ,count(t.placa) AS TOTAL
              FROM ga_frota_ativa t
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
            WHERE situacao = 'A'
            union all
          SELECT 'Ativo' as tipo, COUNT(DISTINCT t.placa) AS TOTAL
            from VW_PAINEL_VIAGEM t
            inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa 
            where t.placa is not null and dtchegada is not null 
              and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
              and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
          union all
          SELECT 'Falha' as tipo, COUNT(DISTINCT t.placa) AS TOTAL
            FROM trposicao t
            inner join (select placa from cgfrota where situacao = 'A' and codigopropri in ( ${empresa} )) a on  a.placa= t.placa 
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
            WHERE t.placa not in (select placa from trposicao where data > sysdate-5 group by placa)
              and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy') and to_date('${dataFinal}','dd/mm/yyyy') 
              and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio')  `;
    }


  }
  getProvedorRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {



    return `SELECT decode(provedorrastreamento,'ConnectorBYSAT', 'BYSAT','ConnectorSascar','SASCAR','ConnectorMaxTrack','MAXTRACK', 'TRACKER') as Provedor,
               COUNT(DISTINCT t.placa) AS TOTAL
               from VW_PAINEL_VIAGEM t
               inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
               inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
               '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
               '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
               where t.placa is not null and dtchegada is not null 
                 and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                 and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
               GROUP BY provedorrastreamento  ORDER BY 2 DESC`;

  }
  getTipoRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select upper(a.tipo) as tipo,   COUNT(DISTINCT t.placa) AS TOTAL
            from VW_PAINEL_VIAGEM t
            inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
            inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
            '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
            '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa 
            where t.placa is not null and dtchegada is not null 
              and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
              and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
            group by a.tipo ORDER BY 2 DESC`;


  }
  getDescricaoRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT upper(t.NOTIFICACAO) as CLASSIFICACAO, COUNT(t.placa) AS TOTAL FROM VW_PAINEL_TELEMETRIA t 
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
          where t.situacao = 'A' and t.codigofiltro in ( ${empresa} )
          and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy')
          and to_date('${dataFinal}','dd/mm/yyyy') 
          and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')  
          GROUP BY t.NOTIFICACAO ORDER BY 2 DESC `;
  }
  getEstadoRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `SELECT 'BR-' || nvl(a.ESTADO_LICENCIAMENTO,'SP') as estado, COUNT(t.placa) AS TOTAL FROM VW_PAINEL_TELEMETRIA t
           inner join ga_frota_ativa a on a.placa = t.placa
           inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
           '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
           '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
          where t.situacao = 'A' and t.codigofiltro in ( ${empresa} )
          and trunc(t.data) between to_date('${dataInicial}','dd/mm/yyyy')
          and to_date('${dataFinal}','dd/mm/yyyy') 
          and (t.provedorrastreamento = '${modulo}' or '${modulo}' = 'vazio')  
          GROUP BY 'BR-' || nvl(a.ESTADO_LICENCIAMENTO,'SP') ORDER BY 2 DESC `;
  }
  getkmMesRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select mes, trunc(sum(percorrido)) as percorrido
              from (select to_char(dtsaida, 'yyyy/mm') as mes,t.placa,                      
                          sum(percorrido) as percorrido
                      from VW_PAINEL_VIAGEM t
                      inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa 
                      where t.placa is not null and dtchegada is not null 
                      and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                      and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                      group by to_char(dtsaida, 'yyyy/mm'),t.placa)
             group by mes order by 1`;
  }
  getkmTipoRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select tipo, trunc(sum(percorrido)) as percorrido
                from (select to_char(dtsaida, 'yyyy/mm') as mes,t.placa,upper(a.tipo) as tipo,                      
                            sum(percorrido) as percorrido
                        from VW_PAINEL_VIAGEM t
                        inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                        inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                        '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                        '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa 
                        where t.placa is not null and dtchegada is not null 
                        and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                        and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                        group by to_char(dtsaida, 'yyyy/mm'),t.placa,a.tipo)
              group by tipo order by 2 desc`;
  }
  getkmDiaRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select mes,  trunc(sum(percorrido)) as percorrido
              from (select to_char(dtsaida, 'yyyy/mm/dd') as mes,  sum(percorrido) as percorrido
                       from VW_PAINEL_VIAGEM t
                      inner join (select placa, tipo from ga_frota_ativa where situacao = 'A'
                                      and proprietario in (${empresa}) ) a on a.placa =   t.placa
                      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
              where t.placa is not null and dtchegada is not null
                and trunc(dtsaida) between to_date('${dataInicial}', 'dd/mm/yyyy') and   to_date('${dataFinal}', 'dd/mm/yyyy')
                and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio')
              group by to_char(dtsaida, 'yyyy/mm/dd'))
             group by mes
             order by 1`;
  }
  getkmDiaMedioRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select mes, trunc(sum(percorrido)/sum(quantidade)) as percorrido
              from (select to_char(dtsaida, 'yyyy/mm/dd')  as mes,
                    count(t.placa) as quantidade,                     
                    sum(percorrido) as percorrido
                from VW_PAINEL_VIAGEM t
                inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                where t.placa is not null and dtchegada is not null 
                and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                group by to_char(dtsaida, 'yyyy/mm/dd'))
              group by mes order by 1`;
  }
  getOcupacaoMesRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select mes, TO_NUMBER(restempo(sum(tempo) ,'E'))  as ocupacao
            from (select t.placa,
                        to_char(dtsaida, 'yyyy/mm') as mes,
                        to_char(dtsaida, 'yyyy/mm/dd') as dia,
                        sum(dtchegada - dtsaida) as tempo,
                        1 as tempo_mes
                    from VW_PAINEL_VIAGEM t
                    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                  where t.placa is not null and dtchegada is not null
                    and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                    and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                  group by t.placa,
                            to_char(dtsaida, 'yyyy/mm'),
                            to_char(dtsaida, 'yyyy/mm/dd')) p
          group by mes
          order by 1`;
  }
  getOcupacaoDiaRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select mes, TO_NUMBER(restempo(sum(tempo) ,'E')) as ocupacao 
                from (select t.placa, to_char(dtsaida, 'yyyy/mm/dd') as mes, sum(dtchegada - dtsaida) as tempo,
                     1 as tempo_mes
                from VW_PAINEL_VIAGEM t
                inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                where trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                and t.placa is not null and dtchegada is not null  
                and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                group by t.placa, to_char(dtsaida, 'yyyy/mm/dd') ) p
                group by mes order by 1`;
  }
  getOcupacaoDiaMedioRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select mes, TO_NUMBER(restempo(sum(tempo)/sum(tempo_mes) ,'E')) as ocupacao 
                from (select t.placa, to_char(dtsaida, 'yyyy/mm/dd') as mes, sum(dtchegada - dtsaida) as tempo,
                     count(t.placa) as tempo_mes
                from VW_PAINEL_VIAGEM t
                inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                where trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                and t.placa is not null and dtchegada is not null  
                and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                group by t.placa, to_char(dtsaida, 'yyyy/mm/dd') ) p
                group by mes order by 1`;
  }
  getOcupacaoTipoRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select upper(tipo) as tipo, TO_NUMBER(restempo(sum(tempo),'E')) as ocupacao
              from (select t.placa, upper(a.tipo) as tipo,
                          to_char(dtsaida, 'yyyy/mm') as mes,
                          to_char(dtsaida, 'yyyy/mm/dd') as dia,
                          sum(dtchegada - dtsaida) as tempo,
                          1 as tempo_mes
                      from VW_PAINEL_VIAGEM t
                      inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                      inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                      '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                      '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                    where t.placa is not  null
                      and dtchegada is not null
                      and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                      and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                    group by t.placa, a.tipo,
                              to_char(dtsaida, 'yyyy/mm'),
                              to_char(dtsaida, 'yyyy/mm/dd')) p
            group by tipo
            order by 2`;
  }
  getOcupacaobaixaRastreadoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {
    return ` select * from (select placa as placa,                    
                   restempo(sum(tempo)/sum(quantidade),'H') as ocupacao,                             
                   trunc(sum(percorrido),1) as percorrido,
                   sum(indice) as indice
              from (select t.placa||' - '||upper(a.tipo) as placa, to_char(dtsaida, 'yyyy/mm') as mes,
                        sum(dtchegada - dtsaida) as tempo,                           
                        sum(percorrido) as percorrido,
                        sum(percorrido) + sum(dtchegada - dtsaida) as indice,
                        count(t.placa) as quantidade
                    from VW_PAINEL_VIAGEM t
                    inner join (select placa,tipo from ga_frota_ativa where situacao = 'A' and proprietario in ( ${empresa} )) a on  a.placa= t.placa 
                    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa
                    where t.placa is not null and dtchegada is not null 
                      and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                      and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                  group by t.placa,a.tipo, to_char(dtsaida, 'yyyy/mm')     
              ) group by placa order by 3) where rownum <= 20 `;
  }
  getTabelaVeiculoKmSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `  select tx.placa, a.tipo,  a.setor, upper(a.sitopera) as operacao,
                      trunc(km_total) as km_total,
                      trunc(km_total / mes) as km_medio_mensal,
                      restempo(tempo_total / dias, 'H') as tempo_medio_diario,
                      mes as qtd_meses,
                      busca_mediakm(trunc(km_total / mes)) as faixa_mediakm
                    from (select t.placa,
                              count(distinct to_char(dtsaida, 'yyyy/mm')) as mes,
                              sum(t.percorrido) as km_total,
                              sum(dtchegada - dtsaida) as tempo_total,
                              count(t.placa) as dias
                        from VW_PAINEL_VIAGEM t
                        inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa         
                        where t.placa is not null and dtchegada is not null
                          and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                          and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                        group by t.placa) tx
                    inner join ga_frota_ativa a on tx.placa = a.placa
                    order by 6 desc`;
}
getHistorKmSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
  codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
  ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

  return `select faixa_mediakm,qutde from (select  busca_mediakm(trunc(km_total / mes)) as faixa_mediakm,
        busca_mkm(trunc(km_total / mes)), count(*) as qutde
                    from (select t.placa,
                              count(distinct to_char(dtsaida, 'yyyy/mm')) as mes,
                              sum(t.percorrido) as km_total,
                              sum(dtchegada - dtsaida) as tempo_total,
                              count(t.placa) as dias
                        from VW_PAINEL_VIAGEM t
                        inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa         
                        where t.placa is not null and dtchegada is not null
                          and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                          and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                        group by t.placa) tx
                    inner join ga_frota_ativa a on tx.placa = a.placa
                    group by busca_mediakm(trunc(km_total / mes)), busca_mkm(trunc(km_total / mes))
                    order by 2)`;
}

getTabelaVeiculoTempoSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
  codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
  ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

  return `select to_char(tempo_medio_diario)||' Hr', qtde from (select  TO_NUMBER(restempo(tempo_total / dias, 'E')) as tempo_medio_diario, count(tx.placa) as qtde
            from (select t.placa,
                      count(distinct to_char(dtsaida, 'yyyy/mm')) as mes,
                      sum(t.percorrido) as km_total,
                      sum(dtchegada - dtsaida) as tempo_total,
                      count(t.placa) as dias
                from VW_PAINEL_VIAGEM t
                inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                        '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                        '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa         
                where t.placa is not null and dtchegada is not null
                  and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                  and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                group by t.placa) tx
            inner join ga_frota_ativa a on tx.placa = a.placa
            group by TO_NUMBER(restempo(tempo_total / dias, 'E'))
            order by 1)`;
}

getTabelaSetorKmSQL(empresa: string, dataInicial: string, dataFinal: string, modulo: string,
  codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
  ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

  return `  select a.setor, upper(a.unidade) as unidade,
                  count(a.placa) as veiculos,
                  trunc(sum(km_total)) as km_total,
                  trunc(sum(km_total) / sum(mes)) as km_medio_mensal,
                  restempo(sum(tempo_total) / sum(dias), 'H') as tempo_medio_diario,
                  trunc(sum(mes)/count(a.placa)) as qtd_meses
              from (select t.placa,
                          count(distinct to_char(dtsaida, 'yyyy/mm')) as mes,
                          sum(t.percorrido) as km_total,
                          sum(dtchegada - dtsaida) as tempo_total,
                          count(t.placa) as dias
                      from VW_PAINEL_VIAGEM t
                    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                                                                    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                                                                    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = t.placa  
                    where t.placa is not null
                      and dtchegada is not null
                      and trunc(dtsaida) between to_date('${dataInicial}','dd/mm/yyyy')  and to_date('${dataFinal}','dd/mm/yyyy') 
                      and (UPPER(t.provedorrastreamento) like '%${modulo}%' or '${modulo}' = 'vazio') 
                    group by t.placa) tx
            inner join ga_frota_ativa a on tx.placa = a.placa
            group by a.setor, a.unidade
            order by 5 desc`;
}

  labelsSQLR(): string {
    const grupo = localStorage.getItem('gerencial_db')!.toLowerCase();
    const banco = environment["banco_" + grupo as keyof typeof environment];
    return `SELECT column_name FROM all_tab_cols
            WHERE table_name = 'PAINEL_TELEMETRIA' AND OWNER = '${banco}'
            ORDER BY column_name`;
  }

  labelsSQLE(): string {
    return ` select upper(column_value) as column_name 
               from table(split('placa,tipo,unidade,setor,operacao,parado,velocidade,freada',','))`;
  }


// ------------------------------------------------------------------ //
//                      LOCACOES                                      //  
// ------------------------------------------------------------------ //

getLocacoesSituacaoSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select nvl(a.sitcar,'Operacional') sitcar,
                  count(distinct ll.placa) as quantidade,
                  sum(case when ll.medicao = (select max(medicao) from audmedicao) then ll.valortotal else 0 end) as total
              from audmedicao ll
              left join ga_frota_ativa a on a.placa = ll.placa
              where nvl(a.PROPRIETARIO,27296) in ( ${empresa} )  
              group by a.sitcar`;
  }
  getLocacoesMensalSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `  SELECT to_char( mes ,'yy/mm' ) || '-' || pckutil.fnc_mesextenso( mes ) as mes , trunc(SUM(VW.TOTAL))  AS TOTAL
               FROM vw_medicao_mes VW
              where vw.codigopropri  in ( ${empresa} )
              GROUP BY to_char( mes ,'yy/mm' ) || '-' || pckutil.fnc_mesextenso( mes )
              ORDER BY 1,2`;
  }
  getLocacoesMesMultaSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select * from ( select mes as mes, count(*) AS qtdveiculo
              from vw_multa_mensalveiculo vw
             inner join (select placa from audmedicao group by placa) ll on ll.placa = vw.placa 
           where  vw.codigofiltro in ( ${empresa} )  
            group by mes order by 1 desc) where rownum <=12`;
  }

  getLocacoesVeiculoMultaSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select placa,modelo,qtdmulta
              from (select ll.placa, nvl(f.modelo, retorno_split(ll.modelo, ' ', 1, 1)) as modelo,  count(*) AS qtdmulta
                      from vw_multa_mensalveiculo vw
                    inner join (select placa,modelo from audmedicao group by placa,modelo) ll on ll.placa = vw.placa
                    inner join cgfrotasuiv f on f.placa = ll.placa                                                               
                    where  vw.codigofiltro in ( ${empresa} )  
                    group by ll.placa,nvl(f.modelo, retorno_split(ll.modelo, ' ', 1, 1))
                    order by 3 desc)
            where rownum <= 20`;
  }

  getLocacoesModelosSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select modelo as modelo, count(*) as Qtde
              from (select ll.placa, nvl(f.modelo, retorno_split(ll.modelo, ' ', 1, 1)) as modelo, medicao
                      from audmedicao ll
                    inner join cgfrotasuiv f on f.placa = ll.placa
                      left join ga_frota_ativa a on a.placa = ll.placa
                    where  ll.medicao = (select max(medicao) from audmedicao) and nvl(a.PROPRIETARIO,27296) in ( ${empresa} ))         
            group by modelo order by 2 desc`;
  }

  getGlosaIndiceSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

     //  where to_date(lo.dt_fechamento,'dd/mm/yyyy') >= fnc_dtmedicao(sysdate, 'I', -8)
     //   and to_date(lo.dt_fechamento,'dd/mm/yyyy') <= fnc_dtmedicao(sysdate, 'I', -1)

    return `  select count(*) as OS_Analise,
                    sum(case when status_sc = 'Aguardando' then 1 end) as Aguardando,
                    sum(case when status_sc = 'Encerrado' then 1 end) as Encerrado, 
                    sum(case when status_sc = 'Encerrado' and (glosa <> 'SIM' or glosa is null) then 1 end) as Encerrado_NAO, 
                    sum(case when status_sc = 'Encerrado' and glosa = 'SIM' then 1 end) as Encerrado_SIM 
                from (select lo.atendimento,
                            lo.ordem_servico,
                            case when (nvl(to_date(lo.dt_fechamento,'dd/mm/yyyy'), sysdate) - to_date(lo.dt_entrada,'dd/mm/yyyy')) >= (16/24) then 'SIM' end tempo,
                            gs.glosa as glosa,
                            gs.status_sc as status_sc
                        from PAINEL_OS lo
                inner join dadosglosa_spal gs on gs.num_os = to_char(lo.ordem_servico)                     
                ) where tempo = 'SIM'`;
  }
  
  getGlosaValorSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select sum(DECODE(dg.glosa,'SIM',1,0)) as num_glosa
              from PAINEL_OS lo
              inner join  dadosglosa_spal dg on dg.num_os = to_char(ordem_servico)
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                          '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                          '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = lo.placa
             WHERE trunc(to_date(lo.dt_fechamento,'dd/mm/yyyy')) >= fnc_dtmedicao(sysdate, 'I', -8)
               and trunc(to_date(lo.dt_fechamento,'dd/mm/yyyy')) <= fnc_dtmedicao(sysdate, 'F', -1)`;
  }
  

  proprietarioSQL(empresa: string, codigogger: string, contrato: string, legal : string, unidade : string, setor : string, tipo : string, veiculo : string, placa : string, gerencial : string, 
    ccusto  : string, local : string, situacao  : string,  sitopera  : string, reserva : string, locacao: string, rastreamento: string): string {
    return `select propri_legal ||' (' || total || ')'  as propri_legal, total as total from
                (select nvl(a.propri_legal,'FROTA OPERACIONAL') as propri_legal, count(distinct ll.placa ) as total
                  from audmedicao ll
                  left join ga_frota_ativa a on a.placa = ll.placa 
                  where nvl(a.PROPRIETARIO,27296) in ( ${empresa} ) 
                  group by a.propri_legal )
                order by 2 desc`;
  }
  getLocacoesValorSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select to_char( mes ,'yy/mm' ) || '-' || pckutil.fnc_mesextenso( mes ) as mes , sum(vw.vlr_avaria) AS mensalveiculo
               from VW_MEDICAO_MES_GERAL_PAINEL VW
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = vw.placa
             where vw.codigofiltro in ( ${empresa} )  
               and mes >= fnc_dtmedicao(sysdate, 'I', -8)
               and mes <= fnc_dtmedicao(sysdate, 'F', -1)
             group by to_char( mes ,'yy/mm' ) || '-' || pckutil.fnc_mesextenso( mes )
             ORDER BY 1,2  `;
  }
  getMotivoOSSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return `select status, count(*) as total from PAINEL_OS p
    inner join (select placa from audmedicao group by placa) ll on ll.placa = p.placa
    inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
    '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
    '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = p.placa
       where p.codigofiltro in  ( ${empresa} )
       and to_date(p.dt_fechamento,'dd/mm/yyyy') >= fnc_dtmedicao(sysdate, 'I', -8)
       and to_date(p.dt_fechamento,'dd/mm/yyyy') <= fnc_dtmedicao(sysdate, 'F', -1) 
       group by status order by 1`;
  }
  getLocacoesValorMultaSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select sum(vw.valor) AS valormulta
               from vw_multa_mensalveiculo VW
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                              '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                              '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = vw.placa
             where vw.codigofiltro in ( ${empresa} )  
               and trunc(vw.dtinfracao) >= fnc_dtmedicao(sysdate, 'I', -1)
               and trunc(vw.dtinfracao) <= fnc_dtmedicao(sysdate, 'F', -1) `;
  }
  getLocacoesValorAvariaSQL(empresa: string, dataInicial: string, dataFinal: string, 
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select sum( total ) as valoravaria
               from vw_medicao_mes_avaria_painel av
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                        '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                        '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = av.placa
             where codigomes = -1
               and codigofiltro in ( ${empresa} )`;
  }
  getLocacoesAbasteciSQL(empresa: string, dataInicial: string, dataFinal: string,
    codigogger: string, contrato: string, legal: string, unidade: string, setor: string, tipo: string, veiculo: string, placa: string, gerencial: string,
    ccusto: string, local: string, situacao: string, sitopera: string, reserva: string, locacao: string, rastreamento: string): string {

    return ` select round(sum(total)/sum(kmmes)*100,0) as perc_rodado 
               from vw_abastecimento_mensalveiculo a
              inner join (select placa from table(painel_veiculo('${empresa}','${codigogger}','${contrato}','${legal}',
                        '${unidade}','${setor}', '${veiculo}', '${tipo}','${placa}','${gerencial}',
                        '${ccusto}', '${local}', '${situacao}','${sitopera}','${reserva}','${locacao}','${rastreamento}')))  filtro on  filtro.placa = a.placa
              where a.codigofiltro in ( ${empresa} )
                and a.dtabastecimento =  trunc((select max(medicao) from audmedicao)) `;
  }

}