--CONSULTA NFE (55)

SELECT nfe.sqnfeletronica, hin.nrdocumento cnpj, itemnfe.dsproduto, itemnfe.vlproduto, 
itemnfe.qtproduto, itemnfe.vlbasecalcicms, itemnfe.sgunidmedcom
FROM tbfis_nfeletronica nfe, tbfis_itemnfe itemnfe, tbfis_hinfeletron hin 
WHERE nfe.sqnfeletronica = itemnfe.sqnfeletronica
AND nfe.sqemitente = hin.sqhinfeletron
and hin.nrdocumento  in ('75315333007464','75315333008940','75315333011496','75315333014673')
and nfe.dhemissao between '2024-04-10 00:00:00' and '2024-04-19 23:59:59'