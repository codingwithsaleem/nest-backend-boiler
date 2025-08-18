import {
  ContractType,
  ExperienceLevel,
  JobEntity,
  JobPostEntity,
  SocialMediaEmbeddable,
} from '@app/database';
import { ExternalLinkEmbeddable } from '@app/database/embeddables/ExternalLink.embeddable';
import { PublicFileEmbeddable } from '@app/database/embeddables/storage/PublicFile.embeddable';
import { CompanySize } from '@app/database/enums/CompanySize.enums';
import { Collection } from '@mikro-orm/core';
// import { Currency } from '@app/database/enums/Currency.enum';

export class PublicJobPost {
  id: string;

  //Header Section
  companyName: string | null;
  recruiterFirmName: string | null;
  logo: PublicFileEmbeddable;
  title: string;
  url: string;
  contractType: ContractType | null;
  experienceLevel: ExperienceLevel;
  roleFocus: string;
  role: Collection<JobEntity, object>;
  remote: boolean | null;
  location: string;
  dateRange: string | null;
  currency: string | null;
  minSalary: number | null;
  maxSalary: number | null;
  OneLineOverview: string;
  nbOfEmployees: string | null;
  sectorSpecialisms: string[] | null;
  serviceSpecialisms: string[] | null;
  workEnvironment: string | null;
  companySize: CompanySize[] | null;
  createdAt: Date | null;

  //Details Section
  whatYouBring: string;
  tasks: string;
  benefits: string | null;
  trainingDevelopment: string | null;
  interviewProcess: string | null;
  visaSponsorchip: string | null;
  securityClearance: string | null;
  Overview: string;
  cultureValues: string | null;
  environmentSustainability: string | null;
  inclusionDiversity: string | null;
  externalLinks: ExternalLinkEmbeddable[] | null;

  //RecruiterFirm
  recruiterFirmOverview: string | null;
  recruiterOverview: string | null;

  //Recruiter
  recruiterSocialMedia: SocialMediaEmbeddable | null;
  recruiterFirmSocialMedia: SocialMediaEmbeddable | null;

  //eslint-disable-next-line jsdoc/require-jsdoc
  constructor(jobPost: JobPostEntity) {
    //Header Section
    this.id = jobPost.id;
    this.createdAt = jobPost.createdAt || null;
    this.companyName = jobPost.company ? jobPost.company.name : null;
    this.recruiterFirmName = jobPost.recruiterFirm
      ? jobPost.recruiterFirm.firmName
      : null;
    this.logo = jobPost.company?.logo ?? jobPost.recruiterFirm?.logo ?? null;
    this.title = jobPost.title;
    this.url = jobPost.url;
    this.contractType = jobPost.contractType;
    this.experienceLevel = jobPost.experienceLevel;
    this.roleFocus = jobPost.roleFocus;
    this.role = jobPost.role;
    this.location = jobPost.location;
    this.dateRange = jobPost.dateRange;
    this.currency = jobPost.currency;
    this.minSalary = jobPost.minSalary;
    this.maxSalary = jobPost.maxSalary;
    this.OneLineOverview = jobPost.recruiterFirm
      ? jobPost.companyOneLineOverview
      : jobPost.company.oneLineOverview;

    this.workEnvironment = jobPost.workEnvironment;
    this.nbOfEmployees = jobPost.company
      ? jobPost.company.nbOfEmployees
      : jobPost.nbOfEmployees;
    this.companySize = jobPost.company
      ? jobPost.company.companySize
      : jobPost.companySize;
    this.serviceSpecialisms = jobPost.company
      ? jobPost.company.serviceSpecialisms
      : jobPost.serviceSpecialisms;
    this.sectorSpecialisms = jobPost.company
      ? jobPost.company.sectorSpecialisms
      : jobPost.sectorSpecialisms;

    //Details Section
    this.whatYouBring = jobPost.whatYouBring;
    this.tasks = jobPost.tasks;
    this.benefits = jobPost.benefits;
    this.trainingDevelopment = jobPost.trainingDevelopment;
    this.interviewProcess = jobPost.interviewProcess;
    this.visaSponsorchip = jobPost.visaSponsorchip;
    this.securityClearance = jobPost.securityClearance;
    this.Overview = jobPost.recruiterFirm
      ? jobPost.companyOverview
      : jobPost.company.overview;
    this.cultureValues = jobPost.company
      ? jobPost.company.cultureValues
      : jobPost.cultureValues;
    this.environmentSustainability = jobPost.company
      ? jobPost.company.environmentSustainability
      : jobPost.environmentSustainability;

    this.inclusionDiversity = jobPost.company
      ? jobPost.company.inclusionDiversity
      : jobPost.inclusionDiversity;

    this.externalLinks = jobPost.recruiterFirm ? null : jobPost.company.externalLinks;

    //RecruiterFirm
    this.recruiterFirmOverview = jobPost.recruiterFirm
      ? jobPost.recruiterFirm.firmOverview
      : null;
    this.recruiterOverview = jobPost.recruiterFirm ? jobPost.recruiterOverview : null;
    this.recruiterFirmSocialMedia = jobPost.recruiterFirm?.socialMedia
      ? jobPost.recruiterFirm?.socialMedia
      : null;
    this.recruiterSocialMedia = jobPost.recruiterFirm
      ? jobPost.recruiterSocialMedia
      : null;
  }
}
