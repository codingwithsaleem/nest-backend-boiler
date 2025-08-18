//RegionState.seeder.ts

import { RegionStateEntity } from '@app/database/entities/RegionState.entity';
import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class RegionStateSeeder extends Seeder {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    if (!context) {
      context = {};
    }
    const regionStateContext: Dictionary<RegionStateEntity> = context;
    const groupContext: Dictionary<RegionGroupEntity> = context;

    if (!groupContext.australia) {
      groupContext.australia = await em.findOneOrFail(RegionGroupEntity, {
        name: 'Australia',
      });
    }

    if (!groupContext.canada) {
      groupContext.canada = await em.findOneOrFail(RegionGroupEntity, {
        name: 'Canada',
      });
    }

    /**************************************************************************/
    // Australia
    /**************************************************************************/

    regionStateContext.newSouthWales = await em.upsert(RegionStateEntity, {
      name: 'New South Wales',
      group: groupContext.australia,
    });

    regionStateContext.victoria = await em.upsert(RegionStateEntity, {
      name: 'Victoria',
      group: groupContext.australia,
    });

    regionStateContext.queensland = await em.upsert(RegionStateEntity, {
      name: 'Queensland',
      group: groupContext.australia,
    });

    regionStateContext.westernAustralia = await em.upsert(RegionStateEntity, {
      name: 'Western Australia',
      group: groupContext.australia,
    });

    regionStateContext.southAustralia = await em.upsert(RegionStateEntity, {
      name: 'South Australia',
      group: groupContext.australia,
    });

    regionStateContext.tasmania = await em.upsert(RegionStateEntity, {
      name: 'Tasmania',
      group: groupContext.australia,
    });

    regionStateContext.northernTerritory = await em.upsert(RegionStateEntity, {
      name: 'Northern Territory',
      group: groupContext.australia,
    });

    regionStateContext.australianCapitalTerritory = await em.upsert(RegionStateEntity, {
      name: 'Australian Capital Territory',
      group: groupContext.australia,
    });

    // /**************************************************************************/
    // // Canada
    // /**************************************************************************/

    regionStateContext.VictoriaAreaBC = await em.upsert(RegionStateEntity, {
      name: 'Ontario',
      group: groupContext.canada,
    });

    regionStateContext.MontrealAreaQC = await em.upsert(RegionStateEntity, {
      name: 'Quebec',
      group: groupContext.canada,
    });

    regionStateContext.GreaterTorontoandHamiltonAreaON = await em.upsert(
      RegionStateEntity,
      {
        name: 'British Columbia',
        group: groupContext.canada,
      },
    );

    regionStateContext.EdmontonAreaAB = await em.upsert(RegionStateEntity, {
      name: 'Alberta',
      group: groupContext.canada,
    });

    regionStateContext.CalgaryAreaAB = await em.upsert(RegionStateEntity, {
      name: 'Manitoba',
      group: groupContext.canada,
    });

    regionStateContext.saskatchewan = await em.upsert(RegionStateEntity, {
      name: 'Saskatchewan',
      group: groupContext.canada,
    });

    regionStateContext.VancouverAreaBC = await em.upsert(RegionStateEntity, {
      name: 'Nova Scotia',
      group: groupContext.canada,
    });

    regionStateContext.QuebecCityAreaQC = await em.upsert(RegionStateEntity, {
      name: 'New Brunswick',
      group: groupContext.canada,
    });

    regionStateContext.OttawaGatineauAreaONQC = await em.upsert(RegionStateEntity, {
      name: 'Newfoundland and Labrador',
      group: groupContext.canada,
    });

    regionStateContext.WinnipegAreaMB = await em.upsert(RegionStateEntity, {
      name: 'Prince Edward Island',
      group: groupContext.canada,
    });

    regionStateContext.KitchenerCambridgeWaterlooAreaON = await em.upsert(
      RegionStateEntity,
      {
        name: 'Yukon',
        group: groupContext.canada,
      },
    );

    regionStateContext.LondonON = await em.upsert(RegionStateEntity, {
      name: 'Northwest Territories',
      group: groupContext.canada,
    });

    regionStateContext.StCatharinesNiagaraON = await em.upsert(RegionStateEntity, {
      name: 'Nunavut',
      group: groupContext.canada,
    });

    // /**************************************************************************/
    // // England
    // /**************************************************************************/

    // regionStateContext.GreaterLondon = await em.upsert(RegionStateEntity, {
    //   name: 'Greater London',
    //   group: groupContext.england,
    // });

    // regionStateContext.WestMidlandsBirminghamCoventry = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'West Midlands (Birmingham, Coventry...)',
    //     group: groupContext.england,
    //   },
    // );

    // regionStateContext.GreaterManchester = await em.upsert(RegionStateEntity, {
    //   name: 'Greater Manchester',
    //   group: groupContext.england,
    // });

    // regionStateContext.WestYorkshireLeedsBradford = await em.upsert(RegionStateEntity, {
    //   name: 'West Yorkshire (Leeds, Bradford...)',
    //   group: groupContext.england,
    // });

    // regionStateContext.HampshireSouthamptonPortsmouth = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Hampshire (Southampton, Portsmouth...)',
    //     group: groupContext.england,
    //   },
    // );

    // regionStateContext.NottinghamshireLeicestershire = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Nottinghamshire & Leicestershire',
    //     group: groupContext.england,
    //   },
    // );

    // regionStateContext.Kent = await em.upsert(RegionStateEntity, {
    //   name: 'Kent',
    //   group: groupContext.england,
    // });

    // regionStateContext.GreaterBristol = await em.upsert(RegionStateEntity, {
    //   name: 'Greater Bristol',
    //   group: groupContext.england,
    // });

    // regionStateContext.LiverpoolArea = await em.upsert(RegionStateEntity, {
    //   name: 'Liverpool Area',
    //   group: groupContext.england,
    // });

    // regionStateContext.SouthYorkshireSheffieldDoncaster = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'South Yorkshire (Sheffield, Doncaster...)',
    //     group: groupContext.england,
    //   },
    // );

    // regionStateContext.SussexBrighton = await em.upsert(RegionStateEntity, {
    //   name: 'Sussex (Brighton...)',
    //   group: groupContext.england,
    // });

    // regionStateContext.Surrey = await em.upsert(RegionStateEntity, {
    //   name: 'Surrey',
    //   group: groupContext.england,
    // });

    // regionStateContext.OxfordshireBuckinghamshire = await em.upsert(RegionStateEntity, {
    //   name: 'Oxfordshire & Buckinghamshire',
    //   group: groupContext.england,
    // });

    // regionStateContext.BerkshireReading = await em.upsert(RegionStateEntity, {
    //   name: 'Berkshire (Reading...)',
    //   group: groupContext.england,
    // });

    // regionStateContext.Essex = await em.upsert(RegionStateEntity, {
    //   name: 'Essex',
    //   group: groupContext.england,
    // });

    // regionStateContext.CambridgeshireCambridge = await em.upsert(RegionStateEntity, {
    //   name: 'Cambridgeshire (Cambridge)',
    //   group: groupContext.england,
    // });

    // regionStateContext.HertfordshireBedfordshire = await em.upsert(RegionStateEntity, {
    //   name: 'Hertfordshire & Bedfordshire',
    //   group: groupContext.england,
    // });

    // regionStateContext.Somerset = await em.upsert(RegionStateEntity, {
    //   name: 'Somerset',
    //   group: groupContext.england,
    // });

    // regionStateContext.Cheshire = await em.upsert(RegionStateEntity, {
    //   name: 'Cheshire',
    //   group: groupContext.england,
    // });

    // regionStateContext.Devon = await em.upsert(RegionStateEntity, {
    //   name: 'Devon',
    //   group: groupContext.england,
    // });

    // regionStateContext.TyneandWearNewcastle = await em.upsert(RegionStateEntity, {
    //   name: 'Tyne and Wear (Newcastle)',
    //   group: groupContext.england,
    // });

    // regionStateContext.Lancashire = await em.upsert(RegionStateEntity, {
    //   name: 'Lancashire',
    //   group: groupContext.england,
    // });

    // regionStateContext.SuffolkNorfolk = await em.upsert(RegionStateEntity, {
    //   name: 'Suffolk & Norfolk',
    //   group: groupContext.england,
    // });

    // /**************************************************************************/
    // // Ireland
    // /**************************************************************************/

    // regionStateContext.ConnachtGalwaySligo = await em.upsert(RegionStateEntity, {
    //   name: 'Connacht (Galway, Sligo...)',
    //   group: groupContext.ireland,
    // });

    // regionStateContext.MunsterCorkLimerick = await em.upsert(RegionStateEntity, {
    //   name: 'Munster (Cork, Limerick..)',
    //   group: groupContext.ireland,
    // });

    // regionStateContext.DublinandLeinsterArea = await em.upsert(RegionStateEntity, {
    //   name: 'Dublin and Leinster Area',
    //   group: groupContext.ireland,
    // });

    // regionStateContext.NorthernIrelandUlsterBelfast = await em.upsert(RegionStateEntity, {
    //   name: 'Northern Ireland & Ulster (Belfast..)',
    //   group: groupContext.ireland,
    // });

    // /**************************************************************************/
    // // Middle East Gulf States
    // /**************************************************************************/

    // regionStateContext.Neom = await em.upsert(RegionStateEntity, {
    //   name: 'Neom',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.Jeddah = await em.upsert(RegionStateEntity, {
    //   name: 'Jeddah',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.Riyadh = await em.upsert(RegionStateEntity, {
    //   name: 'Riyadh',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.Kuwait = await em.upsert(RegionStateEntity, {
    //   name: 'Kuwait',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.Bahrain = await em.upsert(RegionStateEntity, {
    //   name: 'Bahrain',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.Qatar = await em.upsert(RegionStateEntity, {
    //   name: 'Qatar',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.Sharjah = await em.upsert(RegionStateEntity, {
    //   name: 'Sharjah',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.AbuDhabi = await em.upsert(RegionStateEntity, {
    //   name: 'Abu Dhabi',
    //   group: groupContext.middleEastGulfStates,
    // });

    // regionStateContext.Dubai = await em.upsert(RegionStateEntity, {
    //   name: 'Dubai',
    //   group: groupContext.middleEastGulfStates,
    // });

    // /**************************************************************************/
    // // New Zealand
    // /**************************************************************************/

    // regionStateContext.Auckland = await em.upsert(RegionStateEntity, {
    //   name: 'Auckland',
    //   group: groupContext.newZealand,
    // });

    // regionStateContext.Christchurch = await em.upsert(RegionStateEntity, {
    //   name: 'Christchurch',
    //   group: groupContext.newZealand,
    // });

    // regionStateContext.Wellington = await em.upsert(RegionStateEntity, {
    //   name: 'Wellington',
    //   group: groupContext.newZealand,
    // });

    // regionStateContext.Tauranga = await em.upsert(RegionStateEntity, {
    //   name: 'Tauranga',
    //   group: groupContext.newZealand,
    // });

    // regionStateContext.LowerHutt = await em.upsert(RegionStateEntity, {
    //   name: 'Lower Hutt',
    //   group: groupContext.newZealand,
    // });

    // regionStateContext.Dunedin = await em.upsert(RegionStateEntity, {
    //   name: 'Dunedin',
    //   group: groupContext.newZealand,
    // });

    // /**************************************************************************/
    // // Remote
    // /**************************************************************************/

    // regionStateContext.CanadaRemote = await em.upsert(RegionStateEntity, {
    //   name: 'Canada - Remote',
    //   group: groupContext.remote,
    // });

    // regionStateContext.UnitedStatesRemote = await em.upsert(RegionStateEntity, {
    //   name: 'United States - Remote',
    //   group: groupContext.remote,
    // });

    // regionStateContext.EuropeanUnionRemote = await em.upsert(RegionStateEntity, {
    //   name: 'European Union - Remote',
    //   group: groupContext.remote,
    // });

    // regionStateContext.UKRemote = await em.upsert(RegionStateEntity, {
    //   name: 'UK - Remote',
    //   group: groupContext.remote,
    // });

    // regionStateContext.AustraliaRemote = await em.upsert(RegionStateEntity, {
    //   name: 'Australia - Remote',
    //   group: groupContext.remote,
    // });

    // /**************************************************************************/
    // // Scotland
    // /**************************************************************************/

    // regionStateContext.GreaterGlasgowStirlingArea = await em.upsert(RegionStateEntity, {
    //   name: 'Greater Glasgow & Stirling Area',
    //   group: groupContext.scotland,
    // });

    // regionStateContext.SouthWestScotlandandScottishBorders = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'South West Scotland and Scottish Borders',
    //     group: groupContext.scotland,
    //   },
    // );

    // regionStateContext.EdinburghTheLothians = await em.upsert(RegionStateEntity, {
    //   name: 'Edinburgh & The Lothians',
    //   group: groupContext.scotland,
    // });

    // regionStateContext.DundeePerthsireFifeAngusAreas = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Dundee, Perthsire, Fife & Angus Areas',
    //     group: groupContext.scotland,
    //   },
    // );

    // regionStateContext.AberdeenAberdeeshire = await em.upsert(RegionStateEntity, {
    //   name: 'Aberdeen & Aberdeeshire',
    //   group: groupContext.scotland,
    // });

    // /**************************************************************************/
    // // Singapore
    // /**************************************************************************/

    // regionStateContext.Singapore1 = await em.upsert(RegionStateEntity, {
    //   name: 'Singapore',
    //   group: groupContext.singapore,
    // });

    // /**************************************************************************/
    // // United States
    // /**************************************************************************/

    // regionStateContext.ChicagoNapervilleElginILINWI = await em.upsert(RegionStateEntity, {
    //   name: 'Chicago-Naperville-Elgin, IL-IN-WI',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.DetroitWarrenDearbornMI = await em.upsert(RegionStateEntity, {
    //   name: 'Detroit-Warren-Dearborn, MI',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.MinneapolisStPaulBloomingtonMNWI = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Minneapolis-St. Paul-Bloomington, MN-WI',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.SaintLouisMetropolitanAreaMOIL = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Saint Louis Metropolitan Area, MO-IL',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.CincinnatiOHKYIN = await em.upsert(RegionStateEntity, {
    //   name: 'Cincinnati, OH-KY-IN',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.KansasCityMOKS = await em.upsert(RegionStateEntity, {
    //   name: 'Kansas City, MO-KS',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.ColumbusOH = await em.upsert(RegionStateEntity, {
    //   name: 'Columbus, OH',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.IndianapolisCarmelAndersonIN = await em.upsert(RegionStateEntity, {
    //   name: 'Indianapolis-Carmel-Anderson, IN',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.ClevelandElyriaOH = await em.upsert(RegionStateEntity, {
    //   name: 'Cleveland-Elyria, OH',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.NewYorkNewarkJerseyCityNYNJPA = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'New York-Newark-Jersey City, NY-NJ-PA',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.PhiladelphiaCamdenWilmingtonPANJDEMD = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Philadelphia-Camden-Wilmington, PA-NJ-DE-MD',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.RochesterNY = await em.upsert(RegionStateEntity, {
    //   name: 'Rochester, NY',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.BostonCambridgeNewtonMA = await em.upsert(RegionStateEntity, {
    //   name: 'Boston-Cambridge-Newton, MA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.PittsburghPA = await em.upsert(RegionStateEntity, {
    //   name: 'Pittsburgh, PA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.ProvidenceWarwickRIMA = await em.upsert(RegionStateEntity, {
    //   name: 'Providence-Warwick, RI-MA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.HartfordEastHartforMiddletownCT = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Hartford-East Hartford-Middletown, CT',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.BuffaloCheektowagaMetropolitanAreaNY = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Buffalo-Cheektowaga Metropolitan Area, NY',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.RaleighDurhamCaryNC = await em.upsert(RegionStateEntity, {
    //   name: 'Raleigh-Durham-Cary, NC',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.DallasFortWorthArlingtonTX = await em.upsert(RegionStateEntity, {
    //   name: 'Dallas-Fort Worth-Arlington, TX',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.HoustonTheWoodlandsSugarLandTX = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Houston-The Woodlands-Sugar Land, TX',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.WashingtonArlingtonAlexandriaVAMDWV = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Washington-Arlington-Alexandria, VA-MD-WV',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.AtlantaSandySpringsRoswellGA = await em.upsert(RegionStateEntity, {
    //   name: 'Atlanta-Sandy Springs-Roswell, GA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.MiamiFortLauderdalePompanoBeachFL = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Miami-Fort Lauderdale-Pompano Beach, FL',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.TampaStPetersburgClearwaterFL = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Tampa-St. Petersburg-Clearwater, FL',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.BaltimoreMetropolitanAreaMD = await em.upsert(RegionStateEntity, {
    //   name: 'Baltimore Metropolitan Area, MD',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.OrlandoMetropolitanAreaFL = await em.upsert(RegionStateEntity, {
    //   name: 'Orlando Metropolitan Area, FL',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.CharlotteConcordGastoniaNCSC = await em.upsert(RegionStateEntity, {
    //   name: 'Charlotte-Concord-Gastonia, NC-SC',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.SanAntonioNewBraunfelsTX = await em.upsert(RegionStateEntity, {
    //   name: 'San Antonio-New Braunfels, TX',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.AustinRoundRockGeorgetownTX = await em.upsert(RegionStateEntity, {
    //   name: 'Austin-Round Rock-Georgetown, TX',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.PhoenixMesaChandlerAZ = await em.upsert(RegionStateEntity, {
    //   name: 'Phoenix-Mesa-Chandler, AZ',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.NashvilleDavidsonMurfreesboroFranklinTN = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Nashville-Davidson-Murfreesboro-Franklin, TN',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.JacksonvilleFL = await em.upsert(RegionStateEntity, {
    //   name: 'Jacksonville, FL',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.RichmondVA = await em.upsert(RegionStateEntity, {
    //   name: 'Richmond, VA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.OklahomaCityOK = await em.upsert(RegionStateEntity, {
    //   name: 'Oklahoma City, OK',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.KnoxvilleMetAreaTN = await em.upsert(RegionStateEntity, {
    //   name: 'Knoxville Met Area, TN',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.McAllenEdinburgMissionTX = await em.upsert(RegionStateEntity, {
    //   name: 'McAllen-Edinburg-Mission, TX',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.MemphisClarksdaleForrestCityTN = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Memphis-Clarksdale-Forrest City, TN',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.LosAngelesAnaheimRiversideCA = await em.upsert(RegionStateEntity, {
    //   name: 'Los Angeles-Anaheim-Riverside, CA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.RiversideSanBernardinoOntarioCA = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Riverside-San Bernardino-Ontario, CA',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.SanFranciscoOaklandBerkeleyCA = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'San Francisco-Oakland-Berkeley, CA',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.SeattleMetropolitanAreaWA = await em.upsert(RegionStateEntity, {
    //   name: 'Seattle Metropolitan Area, WA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.SanDiegoMetropolitanAreaCA = await em.upsert(RegionStateEntity, {
    //   name: 'San Diego Metropolitan Area, CA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.DenverMetropolitanAreaCO = await em.upsert(RegionStateEntity, {
    //   name: 'Denver Metropolitan Area, CO',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.PortlandVancouverHillsboroORWA = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Portland-Vancouver-Hillsboro, OR-WA',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.SacrementoHendersonParadiseCA = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Sacremento-Henderson-Paradise, CA',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.LasVegasCarmelAndersonNV = await em.upsert(RegionStateEntity, {
    //   name: 'Las Vegas-Carmel-Anderson, NV',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.SanJoseSunnyvaleSantaClaraCA = await em.upsert(RegionStateEntity, {
    //   name: 'San Jose-Sunnyvale-Santa Clara, CA',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.VirginiaBeachNorfolkNewportNewsVANC = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'Virginia Beach-Norfolk-Newport News, VA-NC',
    //     group: groupContext.unitedStates,
    //   },
    // );

    // regionStateContext.SaltLakeCityAreaUT = await em.upsert(RegionStateEntity, {
    //   name: 'Salt Lake City Area, UT',
    //   group: groupContext.unitedStates,
    // });

    // regionStateContext.HonoluluHI = await em.upsert(RegionStateEntity, {
    //   name: 'Honolulu, HI',
    //   group: groupContext.unitedStates,
    // });

    // /**************************************************************************/
    // // Wales
    // /**************************************************************************/

    // regionStateContext.MidNorthernWales = await em.upsert(RegionStateEntity, {
    //   name: 'Mid & Northern Wales',
    //   group: groupContext.wales,
    // });

    // regionStateContext.SouthWestWalesSwanseaPembrokshireArea = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'South West Wales (Swansea & Pembrokshire Area)',
    //     group: groupContext.wales,
    //   },
    // );

    // regionStateContext.SouthEastWalesCardiffNewportArea = await em.upsert(
    //   RegionStateEntity,
    //   {
    //     name: 'South East Wales (Cardiff & Newport Area)',
    //     group: groupContext.wales,
    //   },
    // );
  }
}
