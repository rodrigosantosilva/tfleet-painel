export const loginSQL =
    `SELECT f.codigofun, f.nome, cli.cliente as empresa,
            ger.gerencial as gerencial,con.contrato as contrato,
            ace.baseweb,ace.urlweb,ace.basesc,ace.urlsc,ace.baseic,ace.urlic
    FROM cgfuncio f
    INNER JOIN (select ativo,
                  max(case when sistema = 'SISCAPTURA' then base end) as baseweb,
                  max(case when sistema = 'SISCAPTURA' then url end) as urlweb,
                  max(case when sistema = 'SERVICECENTER' then base end) as basesc,
                  max(case when sistema = 'SERVICECENTER' then url end) as urlsc,
                  max(case when sistema = 'INTELLIGENCECENTER' then base end) as baseic,
                  max(case when sistema = 'INTELLIGENCECENTER' then url end) as urlic
          from sistemaacesso where ativo = 1
          group by ativo) ace on ace.ativo = ace.ativo
    LEFT JOIN (SELECT codigofun, LISTAGG(codigocli, ' , ') WITHIN GROUP( ORDER BY codigofun) AS cliente
              FROM (select codigofun,codigocli from cgfunclie where codigocli in (select codigopropri from cgfrota where codigopropri is not null group by codigopropri) GROUP BY codigofun,codigocli)d
            GROUP BY codigofun) cli ON cli.codigofun = f.codigofun
    LEFT JOIN (SELECT codigofun, LISTAGG(codigogger, ' , ') WITHIN GROUP( ORDER BY codigofun) AS gerencial
              FROM cgfunclie
              WHERE codigogger is not null and codigogger <> 0
            GROUP BY codigofun) ger ON ger.codigofun = f.codigofun  
    LEFT JOIN (SELECT codigofun, LISTAGG(contratoexterno, ' , ') WITHIN GROUP( ORDER BY codigofun) AS contrato
              FROM cgfunclie
              WHERE contratoexterno is not null 
            GROUP BY codigofun) con ON con.codigofun = f.codigofun    
    WHERE (cli.cliente is not null or ger.gerencial is not null or con.contrato is not null)         
    AND f.apelido = : apelido
    AND f.senhaacesso = password.encrypt( : senha ) `;


export const loginDirect =
      `SELECT f.codigofun, f.nome, cli.cliente as empresa,
              ger.gerencial as gerencial,con.contrato as contrato,
              ace.baseweb,ace.urlweb,ace.basesc,ace.urlsc,ace.baseic,ace.urlic
      FROM cgfuncio f
      INNER JOIN (select ativo,
            max(case when sistema = 'SISCAPTURA' then base end) as baseweb,
            max(case when sistema = 'SISCAPTURA' then url end) as urlweb,
            max(case when sistema = 'SERVICECENTER' then base end) as basesc,
            max(case when sistema = 'SERVICECENTER' then url end) as urlsc,
            max(case when sistema = 'INTELLIGENCECENTER' then base end) as baseic,
            max(case when sistema = 'INTELLIGENCECENTER' then url end) as urlic
      from sistemaacesso where ativo = 1
      group by ativo) ace on ace.ativo = ace.ativo
      LEFT JOIN (SELECT codigofun, LISTAGG(codigocli, ' , ') WITHIN GROUP( ORDER BY codigofun) AS cliente
        FROM (select codigofun,codigocli from cgfunclie where codigocli in (select codigopropri from cgfrota where codigopropri is not null group by codigopropri) GROUP BY codigofun,codigocli)d
      GROUP BY codigofun) cli ON cli.codigofun = f.codigofun
      LEFT JOIN (SELECT codigofun, LISTAGG(codigogger, ' , ') WITHIN GROUP( ORDER BY codigofun) AS gerencial
        FROM cgfunclie
        WHERE codigogger is not null and codigogger <> 0
      GROUP BY codigofun) ger ON ger.codigofun = f.codigofun  
      LEFT JOIN (SELECT codigofun, LISTAGG(contratoexterno, ' , ') WITHIN GROUP( ORDER BY codigofun) AS contrato
        FROM cgfunclie
        WHERE contratoexterno is not null 
      GROUP BY codigofun) con ON con.codigofun = f.codigofun    
      WHERE (cli.cliente is not null or ger.gerencial is not null or con.contrato is not null)    
      AND f.codigofun = : codigofun `;




