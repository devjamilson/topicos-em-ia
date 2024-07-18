--CONSULTA NFCE (65)

select nfce.sqnfeconsumo, hin.nrdocumento as cnpj, itemnfce.dsproduto, itemnfce.vlproduto,
itemnfce.qtcomprod, itemnfce.vlbasecalcicms, itemnfce.sgunidmedcom 
from usudba.tbfis_nfeconsumo nfce, usudba.tbfis_itemnfec  itemnfce, usudba.tbcad_instituicao inst,
usudba.tbfis_hinfeletron hin
where nfce.sqnfeconsumo = itemnfce.sqnfeconsumo
and nfce.sqemitente = inst.sqhumanoinst
and inst.sqhumanoinst = hin.sqhinfeletron
--and itemnfce.dsproduto is not null
and hin.nrdocumento  in ('75315333007464','75315333008940','75315333011496','75315333014673')
and nfce.dhemissao between '2024-04-10 00:00:00' and '2024-04-19 23:59:59'