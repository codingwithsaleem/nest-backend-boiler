//Region.seeder.ts

import { RegionEntity } from '@app/database/entities/Region.entity';
import { RegionGroupEntity } from '@app/database/entities/RegionGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';
import { RegionStateEntity } from '@app/database/entities/RegionState.entity';

export class RegionSeeder extends Seeder {
  /* eslint-disable-next-line jsdoc/require-jsdoc */
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    if (!context) {
      context = {};
    }

    const regionContext: Dictionary<RegionEntity> = context;
    const groupContext: Dictionary<RegionGroupEntity> = context;
    const regionStateContext: Dictionary<RegionStateEntity> = context;

    //Australia

    if (!groupContext.australia) {
      groupContext.australia = await em.findOneOrFail(RegionGroupEntity, {
        name: 'Australia',
      });
    }

    if (!regionStateContext.newSouthWales) {
      regionStateContext.newSouthWales = await em.findOneOrFail(RegionStateEntity, {
        name: 'New South Wales',
        group: groupContext.australia,
      });
    }

    if (!regionStateContext.victoria) {
      regionStateContext.victoria = await em.findOneOrFail(RegionStateEntity, {
        name: 'Victoria',
        group: groupContext.australia,
      });
    }

    if (!regionStateContext.queensland) {
      regionStateContext.queensland = await em.findOneOrFail(RegionStateEntity, {
        name: 'Queensland',
        group: groupContext.australia,
      });
    }

    if (!regionStateContext.westernAustralia) {
      regionStateContext.westernAustralia = await em.findOneOrFail(RegionStateEntity, {
        name: 'Western Australia',
        group: groupContext.australia,
      });
    }

    if (!regionStateContext.southAustralia) {
      regionStateContext.southAustralia = await em.findOneOrFail(RegionStateEntity, {
        name: 'South Australia',
        group: groupContext.australia,
      });
    }

    if (!regionStateContext.tasmania) {
      regionStateContext.tasmania = await em.findOneOrFail(RegionStateEntity, {
        name: 'Tasmania',
        group: groupContext.australia,
      });
    }

    if (!regionStateContext.northernTerritory) {
      regionStateContext.northernTerritory = await em.findOneOrFail(RegionStateEntity, {
        name: 'Northern Territory',
        group: groupContext.australia,
      });
    }

    if (!regionStateContext.australianCapitalTerritory) {
      regionStateContext.australianCapitalTerritory = await em.findOneOrFail(
        RegionStateEntity,
        {
          name: 'Australian Capital Territory',
          group: groupContext.australia,
        },
      );
    }

    // canada

    if (!groupContext.canada) {
      groupContext.canada = await em.findOneOrFail(RegionGroupEntity, {
        name: 'Canada',
      });
    }

    if (!regionStateContext.ontario) {
      regionStateContext.ontario = await em.findOneOrFail(RegionStateEntity, {
        name: 'Ontario',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.quebec) {
      regionStateContext.quebec = await em.findOneOrFail(RegionStateEntity, {
        name: 'Quebec',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.britishColumbia) {
      regionStateContext.britishColumbia = await em.findOneOrFail(RegionStateEntity, {
        name: 'British Columbia',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.alberta) {
      regionStateContext.alberta = await em.findOneOrFail(RegionStateEntity, {
        name: 'Alberta',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.manitoba) {
      regionStateContext.manitoba = await em.findOneOrFail(RegionStateEntity, {
        name: 'Manitoba',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.saskatchewan) {
      regionStateContext.saskatchewan = await em.findOneOrFail(RegionStateEntity, {
        name: 'Saskatchewan',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.novaScotia) {
      regionStateContext.novaScotia = await em.findOneOrFail(RegionStateEntity, {
        name: 'Nova Scotia',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.newBrunswick) {
      regionStateContext.newBrunswick = await em.findOneOrFail(RegionStateEntity, {
        name: 'New Brunswick',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.newfoundlandAndLabrador) {
      regionStateContext.newfoundlandAndLabrador = await em.findOneOrFail(
        RegionStateEntity,
        {
          name: 'Newfoundland and Labrador',
          group: groupContext.canada,
        },
      );
    }

    if (!regionStateContext.princeEdwardIsland) {
      regionStateContext.princeEdwardIsland = await em.findOneOrFail(RegionStateEntity, {
        name: 'Prince Edward Island',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.yukon) {
      regionStateContext.yukon = await em.findOneOrFail(RegionStateEntity, {
        name: 'Yukon',
        group: groupContext.canada,
      });
    }

    if (!regionStateContext.northwestTerritories) {
      regionStateContext.northwestTerritories = await em.findOneOrFail(
        RegionStateEntity,
        {
          name: 'Northwest Territories',
          group: groupContext.canada,
        },
      );
    }

    if (!regionStateContext.nunavut) {
      regionStateContext.nunavut = await em.findOneOrFail(RegionStateEntity, {
        name: 'Nunavut',
        group: groupContext.canada,
      });
    }

    /**************************************************************************/
    // Australia
    /**************************************************************************/

    // New South Wales
    regionContext.SydneyNSW = await em.upsert(RegionEntity, {
      name: 'Sydney',
      group: groupContext.australia,
      state: regionStateContext.newSouthWales,
    });

    regionContext.NewcastleNSW = await em.upsert(RegionEntity, {
      name: 'Newcastle',
      group: groupContext.australia,
      state: regionStateContext.newSouthWales,
    });

    regionContext.WollongongNSW = await em.upsert(RegionEntity, {
      name: 'Wollongong',
      group: groupContext.australia,
      state: regionStateContext.newSouthWales,
    });

    regionContext.AlburyNSW = await em.upsert(RegionEntity, {
      name: 'Albury',
      group: groupContext.australia,
      state: regionStateContext.newSouthWales,
    });

    regionContext.MaitlandNSW = await em.upsert(RegionEntity, {
      name: 'Maitland',
      group: groupContext.australia,
      state: regionStateContext.newSouthWales,
    });

    regionContext.WaggaWaggaNSW = await em.upsert(RegionEntity, {
      name: 'Wagga',
      group: groupContext.australia,
      state: regionStateContext.newSouthWales,
    });

    // Victoria

    regionContext.MelbourneVIC = await em.upsert(RegionEntity, {
      name: 'Melbourne',
      group: groupContext.australia,
      state: regionStateContext.victoria,
    });

    regionContext.GeelongVIC = await em.upsert(RegionEntity, {
      name: 'Geelong',
      group: groupContext.australia,
      state: regionStateContext.victoria,
    });

    regionContext.BallaratVIC = await em.upsert(RegionEntity, {
      name: 'Ballarat',
      group: groupContext.australia,
      state: regionStateContext.victoria,
    });

    regionContext.BendigoVIC = await em.upsert(RegionEntity, {
      name: 'Bendigo',
      group: groupContext.australia,
      state: regionStateContext.victoria,
    });

    regionContext.SheppartonVIC = await em.upsert(RegionEntity, {
      name: 'Shepparton',
      group: groupContext.australia,
      state: regionStateContext.victoria,
    });

    regionContext.MilduraVIC = await em.upsert(RegionEntity, {
      name: 'Mildura',
      group: groupContext.australia,
      state: regionStateContext.victoria,
    });

    // Queensland

    regionContext.BrisbaneQLD = await em.upsert(RegionEntity, {
      name: 'Brisbane',
      group: groupContext.australia,
      state: regionStateContext.queensland,
    });

    regionContext.GoldCoastQLD = await em.upsert(RegionEntity, {
      name: 'Gold Coast',
      group: groupContext.australia,
      state: regionStateContext.queensland,
    });

    regionContext.SunshineCoastQLD = await em.upsert(RegionEntity, {
      name: 'Sunshine Coast',
      group: groupContext.australia,
      state: regionStateContext.queensland,
    });

    regionContext.CairnsQLD = await em.upsert(RegionEntity, {
      name: 'Cairns',
      group: groupContext.australia,
      state: regionStateContext.queensland,
    });

    regionContext.TownsvilleQLD = await em.upsert(RegionEntity, {
      name: 'Townsville',
      group: groupContext.australia,
      state: regionStateContext.queensland,
    });

    regionContext.ToowoombaQLD = await em.upsert(RegionEntity, {
      name: 'Toowoomba',
      group: groupContext.australia,
      state: regionStateContext.queensland,
    });

    // Western Australia

    regionContext.PerthWA = await em.upsert(RegionEntity, {
      name: 'Perth',
      group: groupContext.australia,
      state: regionStateContext.westernAustralia,
    });

    regionContext.RockinghamWA = await em.upsert(RegionEntity, {
      name: 'Rockingham',
      group: groupContext.australia,
      state: regionStateContext.westernAustralia,
    });

    regionContext.MandurahWA = await em.upsert(RegionEntity, {
      name: 'Mandurah',
      group: groupContext.australia,
      state: regionStateContext.westernAustralia,
    });

    regionContext.KalgoorlieWA = await em.upsert(RegionEntity, {
      name: 'Kalgoorlie',
      group: groupContext.australia,
      state: regionStateContext.westernAustralia,
    });

    regionContext.BunburyWA = await em.upsert(RegionEntity, {
      name: 'Bunbury',
      group: groupContext.australia,
      state: regionStateContext.westernAustralia,
    });

    regionContext.AlbanyWA = await em.upsert(RegionEntity, {
      name: 'Albany',
      group: groupContext.australia,
      state: regionStateContext.westernAustralia,
    });

    // South Australia

    regionContext.AdelaideSA = await em.upsert(RegionEntity, {
      name: 'Adelaide',
      group: groupContext.australia,
      state: regionStateContext.southAustralia,
    });

    regionContext.MountGambierSA = await em.upsert(RegionEntity, {
      name: 'Mount Gambier',
      group: groupContext.australia,
      state: regionStateContext.southAustralia,
    });

    regionContext.WhyallaSA = await em.upsert(RegionEntity, {
      name: 'Whyalla',
      group: groupContext.australia,
      state: regionStateContext.southAustralia,
    });

    regionContext.GawlerSA = await em.upsert(RegionEntity, {
      name: 'Gawler',
      group: groupContext.australia,
      state: regionStateContext.southAustralia,
    });

    regionContext.PortAugustaSA = await em.upsert(RegionEntity, {
      name: 'Port Augusta',
      group: groupContext.australia,
      state: regionStateContext.southAustralia,
    });

    regionContext.PortPirieSA = await em.upsert(RegionEntity, {
      name: 'Port Pirie',
      group: groupContext.australia,
      state: regionStateContext.southAustralia,
    });

    // Tasmania

    regionContext.HobartTAS = await em.upsert(RegionEntity, {
      name: 'Hobart',
      group: groupContext.australia,
      state: regionStateContext.tasmania,
    });

    regionContext.LauncestonTAS = await em.upsert(RegionEntity, {
      name: 'Launceston',
      group: groupContext.australia,
      state: regionStateContext.tasmania,
    });

    regionContext.DevonportTAS = await em.upsert(RegionEntity, {
      name: 'Devonport',
      group: groupContext.australia,
      state: regionStateContext.tasmania,
    });

    regionContext.BurnieTAS = await em.upsert(RegionEntity, {
      name: 'Burnie',
      group: groupContext.australia,
      state: regionStateContext.tasmania,
    });

    regionContext.KingstonTAS = await em.upsert(RegionEntity, {
      name: 'Kingston',
      group: groupContext.australia,
      state: regionStateContext.tasmania,
    });

    // Northern Territory

    regionContext.DarwinNT = await em.upsert(RegionEntity, {
      name: 'Darwin',
      group: groupContext.australia,
      state: regionStateContext.northernTerritory,
    });

    regionContext.PalmerstonNT = await em.upsert(RegionEntity, {
      name: 'Palmerston',
      group: groupContext.australia,
      state: regionStateContext.northernTerritory,
    });

    regionContext.AliceSpringsNT = await em.upsert(RegionEntity, {
      name: 'Alice Springs',
      group: groupContext.australia,
      state: regionStateContext.northernTerritory,
    });

    regionContext.KatherineNT = await em.upsert(RegionEntity, {
      name: 'Katherine',
      group: groupContext.australia,
      state: regionStateContext.northernTerritory,
    });

    regionContext.NhulunbuyNT = await em.upsert(RegionEntity, {
      name: 'Nhulunbuy',
      group: groupContext.australia,
      state: regionStateContext.northernTerritory,
    });

    // Australian Capital Territory

    regionContext.CanberraACT = await em.upsert(RegionEntity, {
      name: 'Canberra',
      group: groupContext.australia,
      state: regionStateContext.australianCapitalTerritory,
    });

    regionContext.BelconnenACT = await em.upsert(RegionEntity, {
      name: 'Belconnen',
      group: groupContext.australia,
      state: regionStateContext.australianCapitalTerritory,
    });

    regionContext.WodenValleyACT = await em.upsert(RegionEntity, {
      name: 'Woden Valley',
      group: groupContext.australia,
      state: regionStateContext.australianCapitalTerritory,
    });

    regionContext.GungahlinACT = await em.upsert(RegionEntity, {
      name: 'Gungahlin',
      group: groupContext.australia,
      state: regionStateContext.australianCapitalTerritory,
    });

    regionContext.TuggeranongACT = await em.upsert(RegionEntity, {
      name: 'Tuggeranong',
      group: groupContext.australia,
      state: regionStateContext.australianCapitalTerritory,
    });

    /**************************************************************************/
    // Canada
    /**************************************************************************/

    regionContext.VictoriaAreaBC = await em.upsert(RegionEntity, {
      name: 'Toronto',
      group: groupContext.canada,
      state: regionStateContext.ontario,
    });

    regionContext.MontrealAreaQC = await em.upsert(RegionEntity, {
      name: 'Ottawa',
      group: groupContext.canada,
      state: regionStateContext.ontario,
    });

    regionContext.GreaterTorontoandHamiltonAreaON = await em.upsert(RegionEntity, {
      name: 'Mississauga',
      group: groupContext.canada,
      state: regionStateContext.ontario,
    });

    regionContext.EdmontonAreaAB = await em.upsert(RegionEntity, {
      name: 'Hamilton',
      group: groupContext.canada,
      state: regionStateContext.ontario,
    });

    regionContext.CalgaryAreaAB = await em.upsert(RegionEntity, {
      name: 'London',
      group: groupContext.canada,
      state: regionStateContext.ontario,
    });

    regionContext.OttawaAreaON = await em.upsert(RegionEntity, {
      name: 'Montreal',
      group: groupContext.canada,
      state: regionStateContext.quebec,
    });

    regionContext.WinnipegAreaMB = await em.upsert(RegionEntity, {
      name: 'Quebec City',
      group: groupContext.canada,
      state: regionStateContext.quebec,
    });

    regionContext.HalifaxAreaNS = await em.upsert(RegionEntity, {
      name: 'Laval',
      group: groupContext.canada,
      state: regionStateContext.quebec,
    });

    regionContext.VancouverAreaBC = await em.upsert(RegionEntity, {
      name: 'Gatineau',
      group: groupContext.canada,
      state: regionStateContext.quebec,
    });

    regionContext.QuebecCityAreaQC = await em.upsert(RegionEntity, {
      name: 'Sherbrooke',
      group: groupContext.canada,
      state: regionStateContext.quebec,
    });

    // britishColumbia

    regionContext.vancouver = await em.upsert(RegionEntity, {
      name: 'Vancouver',
      group: groupContext.canada,
      state: regionStateContext.britishColumbia,
    });

    // deplucate issue with victoria
    // regionContext.victoria = await em.upsert(RegionEntity, {
    //   name: 'Victoria',
    //   group: groupContext.canada,
    //   state: regionStateContext.britishColumbia,
    // });

    regionContext.kelowna = await em.upsert(RegionEntity, {
      name: 'Kelowna',
      group: groupContext.canada,
      state: regionStateContext.britishColumbia,
    });

    regionContext.abbotsford = await em.upsert(RegionEntity, {
      name: 'Abbotsford',
      group: groupContext.canada,
      state: regionStateContext.britishColumbia,
    });

    regionContext.nanaimo = await em.upsert(RegionEntity, {
      name: 'Nanaimo',
      group: groupContext.canada,
      state: regionStateContext.britishColumbia,
    });

    // alberta

    regionContext.calgary = await em.upsert(RegionEntity, {
      name: 'Calgary',
      group: groupContext.canada,
      state: regionStateContext.alberta,
    });

    regionContext.edmonton = await em.upsert(RegionEntity, {
      name: 'Edmonton',
      group: groupContext.canada,
      state: regionStateContext.alberta,
    });

    regionContext.redDeer = await em.upsert(RegionEntity, {
      name: 'Red Deer',
      group: groupContext.canada,
      state: regionStateContext.alberta,
    });

    regionContext.lethbridge = await em.upsert(RegionEntity, {
      name: 'Lethbridge',
      group: groupContext.canada,
      state: regionStateContext.alberta,
    });

    regionContext.medicineHat = await em.upsert(RegionEntity, {
      name: 'Medicine Hat',
      group: groupContext.canada,
      state: regionStateContext.alberta,
    });

    // manitoba

    regionContext.winnipeg = await em.upsert(RegionEntity, {
      name: 'Winnipeg',
      group: groupContext.canada,
      state: regionStateContext.manitoba,
    });

    regionContext.brandon = await em.upsert(RegionEntity, {
      name: 'Brandon',
      group: groupContext.canada,
      state: regionStateContext.manitoba,
    });

    regionContext.steinbach = await em.upsert(RegionEntity, {
      name: 'Steinbach',
      group: groupContext.canada,
      state: regionStateContext.manitoba,
    });

    regionContext.thompson = await em.upsert(RegionEntity, {
      name: 'Thompson',
      group: groupContext.canada,
      state: regionStateContext.manitoba,
    });

    regionContext.portageLaPrairie = await em.upsert(RegionEntity, {
      name: 'Portage la Prairie',
      group: groupContext.canada,
      state: regionStateContext.manitoba,
    });

    // saskatchewan

    regionContext.saskatoon = await em.upsert(RegionEntity, {
      name: 'Saskatoon',
      group: groupContext.canada,
      state: regionStateContext.saskatchewan,
    });

    regionContext.regina = await em.upsert(RegionEntity, {
      name: 'Regina',
      group: groupContext.canada,
      state: regionStateContext.saskatchewan,
    });

    regionContext.princeAlbert = await em.upsert(RegionEntity, {
      name: 'Prince Albert',
      group: groupContext.canada,
      state: regionStateContext.saskatchewan,
    });

    regionContext.mooseJaw = await em.upsert(RegionEntity, {
      name: 'Moose Jaw',
      group: groupContext.canada,
      state: regionStateContext.saskatchewan,
    });

    regionContext.swiftCurrent = await em.upsert(RegionEntity, {
      name: 'Swift Current',
      group: groupContext.canada,
      state: regionStateContext.saskatchewan,
    });

    // novaScotia

    regionContext.halifax = await em.upsert(RegionEntity, {
      name: 'Halifax',
      group: groupContext.canada,
      state: regionStateContext.novaScotia,
    });

    regionContext.sydney = await em.upsert(RegionEntity, {
      name: 'Sydney',
      group: groupContext.canada,
      state: regionStateContext.novaScotia,
    });

    regionContext.truro = await em.upsert(RegionEntity, {
      name: 'Truro',
      group: groupContext.canada,
      state: regionStateContext.novaScotia,
    });

    regionContext.newGlasgow = await em.upsert(RegionEntity, {
      name: 'New Glasgow',
      group: groupContext.canada,
      state: regionStateContext.novaScotia,
    });

    regionContext.yarmouth = await em.upsert(RegionEntity, {
      name: 'Yarmouth',
      group: groupContext.canada,
      state: regionStateContext.novaScotia,
    });

    // newBrunswick

    regionContext.fredericton = await em.upsert(RegionEntity, {
      name: 'Fredericton',
      group: groupContext.canada,
      state: regionStateContext.newBrunswick,
    });

    regionContext.moncton = await em.upsert(RegionEntity, {
      name: 'Moncton',
      group: groupContext.canada,
      state: regionStateContext.newBrunswick,
    });

    regionContext.saintJohn = await em.upsert(RegionEntity, {
      name: 'Saint John',
      group: groupContext.canada,
      state: regionStateContext.newBrunswick,
    });

    regionContext.bathurst = await em.upsert(RegionEntity, {
      name: 'Bathurst',
      group: groupContext.canada,
      state: regionStateContext.newBrunswick,
    });

    regionContext.edmundston = await em.upsert(RegionEntity, {
      name: 'Edmundston',
      group: groupContext.canada,
      state: regionStateContext.newBrunswick,
    });

    // newfoundlandAndLabrador

    regionContext.stJohns = await em.upsert(RegionEntity, {
      name: `St. John's`,
      group: groupContext.canada,
      state: regionStateContext.newfoundlandAndLabrador,
    });

    regionContext.cornerBrook = await em.upsert(RegionEntity, {
      name: 'Corner Brook',
      group: groupContext.canada,
      state: regionStateContext.newfoundlandAndLabrador,
    });

    regionContext.gander = await em.upsert(RegionEntity, {
      name: 'Gander',
      group: groupContext.canada,
      state: regionStateContext.newfoundlandAndLabrador,
    });

    regionContext.grandFallsWindsor = await em.upsert(RegionEntity, {
      name: 'Grand Falls-Windsor',
      group: groupContext.canada,
      state: regionStateContext.newfoundlandAndLabrador,
    });

    regionContext.happyValleyGooseBay = await em.upsert(RegionEntity, {
      name: 'Happy Valley-Goose Bay',
      group: groupContext.canada,
      state: regionStateContext.newfoundlandAndLabrador,
    });

    // princeEdwardIsland

    regionContext.charlottetown = await em.upsert(RegionEntity, {
      name: 'Charlottetown',
      group: groupContext.canada,
      state: regionStateContext.princeEdwardIsland,
    });

    regionContext.summerside = await em.upsert(RegionEntity, {
      name: 'Summerside',
      group: groupContext.canada,
      state: regionStateContext.princeEdwardIsland,
    });

    regionContext.stratford = await em.upsert(RegionEntity, {
      name: 'Stratford',
      group: groupContext.canada,
      state: regionStateContext.princeEdwardIsland,
    });

    regionContext.cornwall = await em.upsert(RegionEntity, {
      name: 'Cornwall',
      group: groupContext.canada,
      state: regionStateContext.princeEdwardIsland,
    });

    regionContext.montague = await em.upsert(RegionEntity, {
      name: 'Montague',
      group: groupContext.canada,
      state: regionStateContext.princeEdwardIsland,
    });

    // yukon

    regionContext.whitehorse = await em.upsert(RegionEntity, {
      name: 'Whitehorse',
      group: groupContext.canada,
      state: regionStateContext.yukon,
    });

    regionContext.dawson = await em.upsert(RegionEntity, {
      name: 'Dawson City',
      group: groupContext.canada,
      state: regionStateContext.yukon,
    });

    regionContext.watsonLake = await em.upsert(RegionEntity, {
      name: 'Watson Lake',
      group: groupContext.canada,
      state: regionStateContext.yukon,
    });

    regionContext.hainesJunction = await em.upsert(RegionEntity, {
      name: 'Haines Junction',
      group: groupContext.canada,
      state: regionStateContext.yukon,
    });

    regionContext.mayo = await em.upsert(RegionEntity, {
      name: 'Carmacks',
      group: groupContext.canada,
      state: regionStateContext.yukon,
    });

    // northwestTerritories

    regionContext.yellowknife = await em.upsert(RegionEntity, {
      name: 'Yellowknife',
      group: groupContext.canada,
      state: regionStateContext.northwestTerritories,
    });

    regionContext.hayRiver = await em.upsert(RegionEntity, {
      name: 'Inuvik',
      group: groupContext.canada,
      state: regionStateContext.northwestTerritories,
    });

    regionContext.fortSmith = await em.upsert(RegionEntity, {
      name: 'Hay River',
      group: groupContext.canada,
      state: regionStateContext.northwestTerritories,
    });

    regionContext.fortSmith = await em.upsert(RegionEntity, {
      name: 'Fort Smith',
      group: groupContext.canada,
      state: regionStateContext.northwestTerritories,
    });

    regionContext.normanWells = await em.upsert(RegionEntity, {
      name: 'Norman Wells',
      group: groupContext.canada,
      state: regionStateContext.northwestTerritories,
    });

    // nunavut

    regionContext.iqaluit = await em.upsert(RegionEntity, {
      name: 'Iqaluit',
      group: groupContext.canada,
      state: regionStateContext.nunavut,
    });

    regionContext.rankinInlet = await em.upsert(RegionEntity, {
      name: 'Rankin Inlet',
      group: groupContext.canada,
      state: regionStateContext.nunavut,
    });

    regionContext.rankinInlet = await em.upsert(RegionEntity, {
      name: 'Cambridge Bay',
      group: groupContext.canada,
      state: regionStateContext.nunavut,
    });

    regionContext.arviat = await em.upsert(RegionEntity, {
      name: 'Arviat',
      group: groupContext.canada,
      state: regionStateContext.nunavut,
    });

    regionContext.bakerLake = await em.upsert(RegionEntity, {
      name: 'Pond Inlet',
      group: groupContext.canada,
      state: regionStateContext.nunavut,
    });
  }
}
