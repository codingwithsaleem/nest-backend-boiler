import { IndustryEntity } from '@app/database/entities/Industry.entity';
import { IndustryGroupEntity } from '@app/database/entities/IndustryGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class IndustrySeeder extends Seeder {
  // eslint-disable-next-line jsdoc/require-jsdoc
  async run(em: EntityManager, context: Dictionary) {
    const industryContext: Dictionary<IndustryEntity> = context;
    const groupContext: Dictionary<IndustryGroupEntity> = context;

    /**************************************************************************/
    // Digital Infrastructure
    /**************************************************************************/
    industryContext.dataCenters = await em.upsert(IndustryEntity, {
      name: 'Data Centers',
      group: groupContext.digitalInfrastructure,
    });

    industryContext.telecommunicationsInfrastructure = await em.upsert(IndustryEntity, {
      name: 'Telecommunications Infrastructure',
      group: groupContext.digitalInfrastructure,
    });

    /**************************************************************************/
    // Buildings & Places
    /**************************************************************************/
    industryContext.industrialBuildings = await em.upsert(IndustryEntity, {
      name: 'Industrial Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.residentialBuildings = await em.upsert(IndustryEntity, {
      name: 'Residential Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.commercialBuildings = await em.upsert(IndustryEntity, {
      name: 'Commercial Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.utilityBuildings = await em.upsert(IndustryEntity, {
      name: 'Utility Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.healthcareAndCivicBuildings = await em.upsert(IndustryEntity, {
      name: 'Healthcare & Civic Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.transportationBuildings = await em.upsert(IndustryEntity, {
      name: 'Transportation Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.TallAndSupertallBuildings = await em.upsert(IndustryEntity, {
      name: 'Tall & Supertall Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.scienceAndTechBuildings = await em.upsert(IndustryEntity, {
      name: 'Science & Tech Buildings',
      group: groupContext.buildingsAndPlaces,
    });

    industryContext.urbanPlaces = await em.upsert(IndustryEntity, {
      name: 'Urban Places',
      group: groupContext.buildingsAndPlaces,
    });

    /**************************************************************************/
    // Water & Environmental
    /**************************************************************************/
    industryContext.waterInfrastructure = await em.upsert(IndustryEntity, {
      name: 'Water Infrastructure',
      group: groupContext.waterAndEnvironmental,
    });

    industryContext.solidWasteInfrastructure = await em.upsert(IndustryEntity, {
      name: 'Solid Waste Infrastructure',
      group: groupContext.waterAndEnvironmental,
    });

    industryContext.waterfrontInfrastructure = await em.upsert(IndustryEntity, {
      name: 'Waterfront Infrastructure',
      group: groupContext.waterAndEnvironmental,
    });

    industryContext.carbonCapture = await em.upsert(IndustryEntity, {
      name: 'Carbon Capture',
      group: groupContext.waterAndEnvironmental,
    });

    /**************************************************************************/
    // Transport Infrastructure
    /**************************************************************************/
    industryContext.portsMarine = await em.upsert(IndustryEntity, {
      name: 'Ports & Marine',
      group: groupContext.transportInfrastructure,
    });

    industryContext.railTransit = await em.upsert(IndustryEntity, {
      name: 'Rail & Transit',
      group: groupContext.transportInfrastructure,
    });

    industryContext.roadsHighways = await em.upsert(IndustryEntity, {
      name: 'Roads & Highways',
      group: groupContext.transportInfrastructure,
    });

    industryContext.airports = await em.upsert(IndustryEntity, {
      name: 'Airports',
      group: groupContext.transportInfrastructure,
    });

    industryContext.bridges = await em.upsert(IndustryEntity, {
      name: 'Bridges',
      group: groupContext.transportInfrastructure,
    });

    industryContext.tunnels = await em.upsert(IndustryEntity, {
      name: 'Tunnels',
      group: groupContext.transportInfrastructure,
    });

    /**************************************************************************/
    // Generating Energy
    /**************************************************************************/
    industryContext.solarEnergy = await em.upsert(IndustryEntity, {
      name: 'Solar Energy',
      group: groupContext.generatingEnergy,
    });

    industryContext.hydropower = await em.upsert(IndustryEntity, {
      name: 'Hydropower',
      group: groupContext.generatingEnergy,
    });

    industryContext.bioenergy = await em.upsert(IndustryEntity, {
      name: 'Bioenergy',
      group: groupContext.generatingEnergy,
    });

    industryContext.nuclearEnergy = await em.upsert(IndustryEntity, {
      name: 'Nuclear Energy',
      group: groupContext.generatingEnergy,
    });

    industryContext.geothermal = await em.upsert(IndustryEntity, {
      name: 'Geothermal',
      group: groupContext.generatingEnergy,
    });

    industryContext.windEnergy = await em.upsert(IndustryEntity, {
      name: 'Wind Energy',
      group: groupContext.generatingEnergy,
    });

    industryContext.hydrogenPower = await em.upsert(IndustryEntity, {
      name: 'Hydrogen Power',
      group: groupContext.generatingEnergy,
    });

    /**************************************************************************/
    // Moving Energy
    /**************************************************************************/
    industryContext.chargingInfrastructure = await em.upsert(IndustryEntity, {
      name: 'Charging Infrastructure',
      group: groupContext.movingEnergy,
    });

    industryContext.EnergyStorageBatteries = await em.upsert(IndustryEntity, {
      name: 'Energy Storage & Batteries',
      group: groupContext.movingEnergy,
    });

    industryContext.powerGrids = await em.upsert(IndustryEntity, {
      name: 'Power Grids',
      group: groupContext.movingEnergy,
    });

    industryContext.Substations = await em.upsert(IndustryEntity, {
      name: 'Substations',
      group: groupContext.movingEnergy,
    });
  }
}
