import { JobEntity } from '@app/database/entities/Job.entity';
import { JobGroupEntity } from '@app/database/entities/JobGroup.entity';
import { Dictionary } from '@mikro-orm/core';
import { EntityManager } from '@mikro-orm/postgresql';
import { Seeder } from '@mikro-orm/seeder';

export class JobSeeder extends Seeder {
  // eslint-disable-next-line jsdoc/require-jsdoc
  async run(em: EntityManager, context: Dictionary) {
    const contextJob: Dictionary<JobEntity> = context;
    const contextGroup: Dictionary<JobGroupEntity> = context;

    /**************************************************************************/
    // Technician
    /**************************************************************************/

    contextJob.InstallationTechnician = await em.upsert(JobEntity, {
      name: 'Installation Technician',
      group: contextGroup.technician,
    });

    contextJob.OperationAndMaintenanceTechnician = await em.upsert(JobEntity, {
      name: 'Operation & Maintenance Technician',
      group: contextGroup.technician,
    });

    contextJob.PumpTechnician = await em.upsert(JobEntity, {
      name: 'Pump Technician',
      group: contextGroup.technician,
    });

    contextJob.WindTechnician = await em.upsert(JobEntity, {
      name: 'Wind Technician',
      group: contextGroup.technician,
    });

    contextJob.SolarPVTechnician = await em.upsert(JobEntity, {
      name: 'Solar PV Technician',
      group: contextGroup.technician,
    });

    contextJob.EVChargingPointTechnician = await em.upsert(JobEntity, {
      name: 'EV Charging Point Technician',
      group: contextGroup.technician,
    });

    contextJob.GeotechnicalTechnician = await em.upsert(JobEntity, {
      name: 'Geotechnical Technician',
      group: contextGroup.technician,
    });

    contextJob.ElectricalTechnician = await em.upsert(JobEntity, {
      name: 'Electrical Technician',
      group: contextGroup.technician,
    });

    contextJob.HVACTechnician = await em.upsert(JobEntity, {
      name: 'HVAC Technician',
      group: contextGroup.technician,
    });

    contextJob.MechanicalTechnician = await em.upsert(JobEntity, {
      name: 'Mechanical Technician',
      group: contextGroup.technician,
    });

    contextJob.TestingCommissioningTechnician = await em.upsert(JobEntity, {
      name: 'Testing & Commissioning Technician',
      group: contextGroup.technician,
    });

    /**************************************************************************/
    // Engineering
    /**************************************************************************/

    contextJob.CivilEngineering = await em.upsert(JobEntity, {
      name: 'Civil Engineering',
      group: contextGroup.engineering,
    });

    contextJob.StructuralEngineering = await em.upsert(JobEntity, {
      name: 'Structural Engineering',
      group: contextGroup.engineering,
    });

    contextJob.GeotechnicalEngineering = await em.upsert(JobEntity, {
      name: 'Geotechnical Engineering',
      group: contextGroup.engineering,
    });

    contextJob.ElectricalEngineering = await em.upsert(JobEntity, {
      name: 'Electrical Engineering',
      group: contextGroup.engineering,
    });

    contextJob.PowerSystemsEngineering = await em.upsert(JobEntity, {
      name: 'Power Systems Engineering',
      group: contextGroup.engineering,
    });

    contextJob.HVACEngineering = await em.upsert(JobEntity, {
      name: 'HVAC Engineering',
      group: contextGroup.engineering,
    });

    contextJob.MEPEngineering = await em.upsert(JobEntity, {
      name: 'MEP Engineering',
      group: contextGroup.engineering,
    });

    contextJob.MechanicalEngineering = await em.upsert(JobEntity, {
      name: 'Mechanical Engineering',
      group: contextGroup.engineering,
    });

    contextJob.SystemsEngineering = await em.upsert(JobEntity, {
      name: 'Systems Engineering',
      group: contextGroup.engineering,
    });

    contextJob.FacadeEngineering = await em.upsert(JobEntity, {
      name: 'Facade Engineering',
      group: contextGroup.engineering,
    });

    contextJob.EnvironmentalEngineering = await em.upsert(JobEntity, {
      name: 'Environmental Engineering',
      group: contextGroup.engineering,
    });

    /**************************************************************************/
    // Environmental
    /**************************************************************************/

    contextJob.EnvironmentalTechnician = await em.upsert(JobEntity, {
      name: 'Environmental Technician',
      group: contextGroup.environmental,
    });

    contextJob.Geologist = await em.upsert(JobEntity, {
      name: 'Geologist',
      group: contextGroup.environmental,
    });

    contextJob.EnvironmentalManagement = await em.upsert(JobEntity, {
      name: 'Environmental Management',
      group: contextGroup.environmental,
    });

    contextJob.EnvironmentalEngineer = await em.upsert(JobEntity, {
      name: 'Environmental Engineer',
      group: contextGroup.environmental,
    });

    contextJob.WaterQualityManagement = await em.upsert(JobEntity, {
      name: 'Water Quality Management',
      group: contextGroup.environmental,
    });

    contextJob.AirQualityManagement = await em.upsert(JobEntity, {
      name: 'Air Quality Management',
      group: contextGroup.environmental,
    });

    contextJob.EnvironmentalScientist = await em.upsert(JobEntity, {
      name: 'Environmental Scientist',
      group: contextGroup.environmental,
    });

    contextJob.EnvironmentalImpactAssessmentManagement = await em.upsert(JobEntity, {
      name: 'Environmental Impact Assessment Management',
      group: contextGroup.environmental,
    });

    contextJob.Hydrogeologist = await em.upsert(JobEntity, {
      name: 'Hydrogeologist',
      group: contextGroup.environmental,
    });

    contextJob.EnvironmentalCompliance = await em.upsert(JobEntity, {
      name: 'Environmental Compliance',
      group: contextGroup.environmental,
    });

    contextJob.Biologist = await em.upsert(JobEntity, {
      name: 'Biologist',
      group: contextGroup.environmental,
    });

    /**************************************************************************/
    // Sustainability
    /**************************************************************************/

    contextJob.SustainabilityEngineer = await em.upsert(JobEntity, {
      name: 'Sustainability Engineer',
      group: contextGroup.sustainability,
    });

    contextJob.EnergyEngineer = await em.upsert(JobEntity, {
      name: 'Energy Engineer',
      group: contextGroup.sustainability,
    });

    contextJob.SustainabilityAnalystStrategy = await em.upsert(JobEntity, {
      name: 'Sustainability Analyst/Strategy',
      group: contextGroup.sustainability,
    });

    contextJob.SustainabilityManager = await em.upsert(JobEntity, {
      name: 'Sustainability Manager',
      group: contextGroup.sustainability,
    });

    contextJob.SustainabilityConsultant = await em.upsert(JobEntity, {
      name: 'Sustainability Consultant',
      group: contextGroup.sustainability,
    });

    /**************************************************************************/
    // BIMAndDesign
    /**************************************************************************/

    contextJob.CivilDesigner = await em.upsert(JobEntity, {
      name: 'Civil Designer',
      group: contextGroup.bimDesign,
    });

    contextJob.StructuralDesigner = await em.upsert(JobEntity, {
      name: 'Structural Designer',
      group: contextGroup.bimDesign,
    });

    contextJob.ElectricalDesigner = await em.upsert(JobEntity, {
      name: 'Electrical Designer',
      group: contextGroup.bimDesign,
    });

    contextJob.MechanicalDesigner = await em.upsert(JobEntity, {
      name: 'Mechanical Designer',
      group: contextGroup.bimDesign,
    });

    contextJob.FacadeDesigner = await em.upsert(JobEntity, {
      name: 'Facade Designer',
      group: contextGroup.bimDesign,
    });

    contextJob.ArchitecturalDesigner = await em.upsert(JobEntity, {
      name: 'Architectural Designer',
      group: contextGroup.bimDesign,
    });

    contextJob.BIMCoordinator = await em.upsert(JobEntity, {
      name: 'BIM Coordinator',
      group: contextGroup.bimDesign,
    });

    contextJob.BIMManager = await em.upsert(JobEntity, {
      name: 'BIM Manager',
      group: contextGroup.bimDesign,
    });

    contextJob.BIMInformationManager = await em.upsert(JobEntity, {
      name: 'BIM Information Manager',
      group: contextGroup.bimDesign,
    });

    contextJob.CivilModellerDrafter = await em.upsert(JobEntity, {
      name: 'Civil Modeller/Drafter',
      group: contextGroup.bimDesign,
    });

    contextJob.StructuralModellerDrafter = await em.upsert(JobEntity, {
      name: 'Structural Modeller/Drafter',
      group: contextGroup.bimDesign,
    });

    contextJob.MechanicalModellerDrafter = await em.upsert(JobEntity, {
      name: 'Mechanical Modeller/Drafter',
      group: contextGroup.bimDesign,
    });

    contextJob.ElectricalModellerDrafter = await em.upsert(JobEntity, {
      name: 'Electrical Modeller/Drafter',
      group: contextGroup.bimDesign,
    });

    contextJob.ArchitecturalModellerDrafter = await em.upsert(JobEntity, {
      name: 'Architectural Modeller/Drafter',
      group: contextGroup.bimDesign,
    });

    /**************************************************************************/
    // ProjectManagement
    /**************************************************************************/

    contextJob.ProjectManager = await em.upsert(JobEntity, {
      name: 'Project Manager',
      group: contextGroup.projectManagement,
    });

    contextJob.ProgramManagement = await em.upsert(JobEntity, {
      name: 'Program Management',
      group: contextGroup.projectManagement,
    });

    contextJob.ProjectEngineer = await em.upsert(JobEntity, {
      name: 'Project Engineer',
      group: contextGroup.projectManagement,
    });

    contextJob.scheduler = await em.upsert(JobEntity, {
      name: 'Scheduler',
      group: contextGroup.projectManagement,
    });

    contextJob.PlannerPlanningManager = await em.upsert(JobEntity, {
      name: 'Planner / Planning Manager',
      group: contextGroup.projectManagement,
    });

    contextJob.DesignManagement = await em.upsert(JobEntity, {
      name: 'Design Management',
      group: contextGroup.projectManagement,
    });

    contextJob.TechnicalManagement = await em.upsert(JobEntity, {
      name: 'Technical Management',
      group: contextGroup.projectManagement,
    });

    contextJob.ProjectControlsManager = await em.upsert(JobEntity, {
      name: 'Project Controls Manager',
      group: contextGroup.projectManagement,
    });

    contextJob.LogisticsSupplyChainManager = await em.upsert(JobEntity, {
      name: 'Logistics-Supply Chain Manager',
      group: contextGroup.projectManagement,
    });

    contextJob.RiskManager = await em.upsert(JobEntity, {
      name: 'Risk Manager',
      group: contextGroup.projectManagement,
    });

    contextJob.DocumentController = await em.upsert(JobEntity, {
      name: 'Document Controller',
      group: contextGroup.projectManagement,
    });

    /**************************************************************************/
    // Admin
    /**************************************************************************/

    contextJob.GeneralAdminAndSupport = await em.upsert(JobEntity, {
      name: 'General Admin & Support',
      group: contextGroup.admin,
    });

    contextJob.ProjectAndSiteAdmin = await em.upsert(JobEntity, {
      name: 'Project & Site Admin',
      group: contextGroup.admin,
    });

    contextJob.CustomerService = await em.upsert(JobEntity, {
      name: 'Customer Service',
      group: contextGroup.admin,
    });

    contextJob.ContractsAndProcurementAdmin = await em.upsert(JobEntity, {
      name: 'Contracts & Procurement Admin',
      group: contextGroup.admin,
    });

    contextJob.FinancialAndAccountingAdmin = await em.upsert(JobEntity, {
      name: 'Financial & Accounting Admin',
      group: contextGroup.admin,
    });

    contextJob.TechnicalAdmin = await em.upsert(JobEntity, {
      name: 'Technical Admin',
      group: contextGroup.admin,
    });

    contextJob.ITAdmin = await em.upsert(JobEntity, {
      name: 'IT Admin',
      group: contextGroup.admin,
    });

    /**************************************************************************/
    // Geomatics
    /**************************************************************************/

    contextJob.LandSurveyor = await em.upsert(JobEntity, {
      name: 'Land Surveyor',
      group: contextGroup.geomatics,
    });

    contextJob.LandSurveyorTechnician = await em.upsert(JobEntity, {
      name: 'Land Surveyor Technician',
      group: contextGroup.geomatics,
    });

    contextJob.GISTechnician = await em.upsert(JobEntity, {
      name: 'GIS Technician',
      group: contextGroup.geomatics,
    });

    /**************************************************************************/
    // MasterPlanning
    /**************************************************************************/

    contextJob.TownPlanner = await em.upsert(JobEntity, {
      name: 'Town Planner',
      group: contextGroup.masterPlanning,
    });

    contextJob.UrbanPlanner = await em.upsert(JobEntity, {
      name: 'Urban Planner',
      group: contextGroup.masterPlanning,
    });

    contextJob.UrbanDesigner = await em.upsert(JobEntity, {
      name: 'Urban Designer',
      group: contextGroup.masterPlanning,
    });

    contextJob.TransportPlanner = await em.upsert(JobEntity, {
      name: 'Transport Planner',
      group: contextGroup.masterPlanning,
    });

    contextJob.EnvironmentalPlanner = await em.upsert(JobEntity, {
      name: 'Environmental Planner',
      group: contextGroup.masterPlanning,
    });

    contextJob.LandManagementAndPlanning = await em.upsert(JobEntity, {
      name: 'Land Management and Planning',
      group: contextGroup.masterPlanning,
    });

    /**************************************************************************/
    // CommercialManagement
    /**************************************************************************/

    contextJob.CommercialManager = await em.upsert(JobEntity, {
      name: 'Commercial Manager',
      group: contextGroup.commercialManagement,
    });

    contextJob.CostManager = await em.upsert(JobEntity, {
      name: 'Cost Manager',
      group: contextGroup.commercialManagement,
    });

    contextJob.ContractsManager = await em.upsert(JobEntity, {
      name: 'Contracts Manager',
      group: contextGroup.commercialManagement,
    });

    contextJob.ProcurementManager = await em.upsert(JobEntity, {
      name: 'Procurement Manager',
      group: contextGroup.commercialManagement,
    });

    contextJob.QuantitySurveyor = await em.upsert(JobEntity, {
      name: 'Quantity Surveyor',
      group: contextGroup.commercialManagement,
    });

    contextJob.Estimator = await em.upsert(JobEntity, {
      name: 'Estimator',
      group: contextGroup.commercialManagement,
    });

    /**************************************************************************/
    // BD + Bids
    /**************************************************************************/

    contextJob.BusinessDevelopment = await em.upsert(JobEntity, {
      name: 'Business Development',
      group: contextGroup.bdBids,
    });

    contextJob.BidProposalManagement = await em.upsert(JobEntity, {
      name: 'Bid/Proposal Management',
      group: contextGroup.bdBids,
    });

    contextJob.ClientAccountManagement = await em.upsert(JobEntity, {
      name: 'Client Account Management',
      group: contextGroup.bdBids,
    });

    contextJob.Sales = await em.upsert(JobEntity, {
      name: 'Sales',
      group: contextGroup.bdBids,
    });

    contextJob.BidProposalWriter = await em.upsert(JobEntity, {
      name: 'Bid/Proposal Writer',
      group: contextGroup.bdBids,
    });

    contextJob.TechnicalSales = await em.upsert(JobEntity, {
      name: 'Technical sales',
      group: contextGroup.bdBids,
    });

    /**************************************************************************/
    // Data
    /**************************************************************************/

    contextJob.DataArchitect = await em.upsert(JobEntity, {
      name: 'Data Architect',
      group: contextGroup.data,
    });

    contextJob.DataScientist = await em.upsert(JobEntity, {
      name: 'Data Scientist',
      group: contextGroup.data,
    });

    contextJob.Analytics = await em.upsert(JobEntity, {
      name: 'Analytics',
      group: contextGroup.data,
    });

    contextJob.DataAnalysis = await em.upsert(JobEntity, {
      name: 'Data Analysis',
      group: contextGroup.data,
    });

    contextJob.AIMachineLearningEngineer = await em.upsert(JobEntity, {
      name: 'AI & Machine Learning Engineer',
      group: contextGroup.data,
    });

    /**************************************************************************/
    // TradesOperators
    /**************************************************************************/

    contextJob.GeneralConstructionOperativeLabourer = await em.upsert(JobEntity, {
      name: 'General Construction Operative (Labourer)',
      group: contextGroup.tradesOperators,
    });

    contextJob.Mason = await em.upsert(JobEntity, {
      name: 'Mason',
      group: contextGroup.tradesOperators,
    });

    contextJob.FlooringInstaller = await em.upsert(JobEntity, {
      name: 'Flooring Installer',
      group: contextGroup.tradesOperators,
    });

    contextJob.Glazier = await em.upsert(JobEntity, {
      name: 'Glazier',
      group: contextGroup.tradesOperators,
    });

    contextJob.Ironworker = await em.upsert(JobEntity, {
      name: 'Ironworker',
      group: contextGroup.tradesOperators,
    });

    contextJob.ConcreteFinisher = await em.upsert(JobEntity, {
      name: 'Concrete Finisher',
      group: contextGroup.tradesOperators,
    });

    contextJob.Insulator = await em.upsert(JobEntity, {
      name: 'Insulator',
      group: contextGroup.tradesOperators,
    });

    contextJob.Plumber = await em.upsert(JobEntity, {
      name: 'Plumber',
      group: contextGroup.tradesOperators,
    });

    contextJob.Pipefitter = await em.upsert(JobEntity, {
      name: 'Pipefitter',
      group: contextGroup.tradesOperators,
    });

    contextJob.Welder = await em.upsert(JobEntity, {
      name: 'Welder',
      group: contextGroup.tradesOperators,
    });

    contextJob.SheetMetalWorker = await em.upsert(JobEntity, {
      name: 'Sheet Metal Worker',
      group: contextGroup.tradesOperators,
    });

    contextJob.Boilermaker = await em.upsert(JobEntity, {
      name: 'Boilermaker',
      group: contextGroup.tradesOperators,
    });

    contextJob.Electrician = await em.upsert(JobEntity, {
      name: 'Electrician',
      group: contextGroup.tradesOperators,
    });

    contextJob.Roofer = await em.upsert(JobEntity, {
      name: 'Roofer',
      group: contextGroup.tradesOperators,
    });

    contextJob.Bricklayer = await em.upsert(JobEntity, {
      name: 'Bricklayer',
      group: contextGroup.tradesOperators,
    });

    contextJob.Painter = await em.upsert(JobEntity, {
      name: 'Painter',
      group: contextGroup.tradesOperators,
    });

    contextJob.Carpenter = await em.upsert(JobEntity, {
      name: 'Carpenter',
      group: contextGroup.tradesOperators,
    });

    contextJob.HeavyMachineryOperator = await em.upsert(JobEntity, {
      name: 'Heavy Machinery Operator',
      group: contextGroup.tradesOperators,
    });

    contextJob.CraneOperator = await em.upsert(JobEntity, {
      name: 'Crane Operator',
      group: contextGroup.tradesOperators,
    });

    contextJob.PlantOperator = await em.upsert(JobEntity, {
      name: 'Plant Operator',
      group: contextGroup.tradesOperators,
    });

    contextJob.LightMachineryOperator = await em.upsert(JobEntity, {
      name: 'Light Machinery Operator',
      group: contextGroup.tradesOperators,
    });

    /**************************************************************************/
    // Architecture
    /**************************************************************************/

    contextJob.Architect = await em.upsert(JobEntity, {
      name: 'Architect',
      group: contextGroup.architecture,
    });

    contextJob.ArchitecturalDesigner = await em.upsert(JobEntity, {
      name: 'Architectural Designer',
      group: contextGroup.architecture,
    });

    contextJob.ProjectArchitect = await em.upsert(JobEntity, {
      name: 'Project Architect',
      group: contextGroup.architecture,
    });

    contextJob.InteriorArchitect = await em.upsert(JobEntity, {
      name: 'Interior Architect',
      group: contextGroup.architecture,
    });

    contextJob.LandscapeArchitect = await em.upsert(JobEntity, {
      name: 'Landscape Architect',
      group: contextGroup.architecture,
    });

    /**************************************************************************/
    // Corporate
    /**************************************************************************/

    contextJob.MarketingAndCommunications = await em.upsert(JobEntity, {
      name: 'Marketing & Communications',
      group: contextGroup.corporate,
    });

    contextJob.CommunityRelations = await em.upsert(JobEntity, {
      name: 'Community Relations',
      group: contextGroup.corporate,
    });

    contextJob.BusinessAnalysisAndPlanning = await em.upsert(JobEntity, {
      name: 'Business Analysis & Planning',
      group: contextGroup.corporate,
    });

    contextJob.InvestmentManagement = await em.upsert(JobEntity, {
      name: 'Investment management',
      group: contextGroup.corporate,
    });

    contextJob.BusinessSystemsAndIT = await em.upsert(JobEntity, {
      name: 'Business Systems & IT',
      group: contextGroup.corporate,
    });

    contextJob.BusinessControlsManager = await em.upsert(JobEntity, {
      name: 'Business Controls Manager',
      group: contextGroup.corporate,
    });

    contextJob.FinanceAnalystManager = await em.upsert(JobEntity, {
      name: 'Finance Analyst/Manager',
      group: contextGroup.corporate,
    });

    contextJob.Accounting = await em.upsert(JobEntity, {
      name: 'Accounting',
      group: contextGroup.corporate,
    });

    contextJob.TalentAcquisition = await em.upsert(JobEntity, {
      name: 'Talent Acquisition',
      group: contextGroup.corporate,
    });

    contextJob.HumanResources = await em.upsert(JobEntity, {
      name: 'Human Resources',
      group: contextGroup.corporate,
    });

    contextJob.RecruitmentConsultant = await em.upsert(JobEntity, {
      name: 'Recruitment Consultant',
      group: contextGroup.corporate,
    });

    contextJob.LegalCounsel = await em.upsert(JobEntity, {
      name: 'Legal Counsel',
      group: contextGroup.corporate,
    });

    contextJob.Attorney = await em.upsert(JobEntity, {
      name: 'Attorney',
      group: contextGroup.corporate,
    });

    contextJob.Paralegal = await em.upsert(JobEntity, {
      name: 'Paralegal',
      group: contextGroup.corporate,
    });

    /**************************************************************************/
    // ConstructionManagement
    /**************************************************************************/

    contextJob.ResidentEngineer = await em.upsert(JobEntity, {
      name: 'Resident Engineer',
      group: contextGroup.constructionManagement,
    });

    contextJob.Superintendent = await em.upsert(JobEntity, {
      name: 'Superintendent',
      group: contextGroup.constructionManagement,
    });

    contextJob.GeneralForeman = await em.upsert(JobEntity, {
      name: 'General Foreman',
      group: contextGroup.constructionManagement,
    });

    contextJob.Inspector = await em.upsert(JobEntity, {
      name: 'Inspector',
      group: contextGroup.constructionManagement,
    });

    contextJob.HSEManagement = await em.upsert(JobEntity, {
      name: 'HSE Management',
      group: contextGroup.constructionManagement,
    });

    contextJob.BuildingSurveyor = await em.upsert(JobEntity, {
      name: 'Building Surveyor',
      group: contextGroup.constructionManagement,
    });

    contextJob.SiteConstructionEngineer = await em.upsert(JobEntity, {
      name: 'Site/Construction Engineer',
      group: contextGroup.constructionManagement,
    });

    contextJob.QAQCManagement = await em.upsert(JobEntity, {
      name: 'QA/QC Management',
      group: contextGroup.constructionManagement,
    });

    contextJob.ConstructionManager = await em.upsert(JobEntity, {
      name: 'Construction Manager',
      group: contextGroup.constructionManagement,
    });

    contextJob.SiteManager = await em.upsert(JobEntity, {
      name: 'Site Manager',
      group: contextGroup.constructionManagement,
    });

    contextJob.ProjectSurveyor = await em.upsert(JobEntity, {
      name: 'Project Surveyor',
      group: contextGroup.constructionManagement,
    });
  }
}
