import React, { useState, useEffect, useRef } from 'react';
import FeedbackLink from "./FeedbackLink.jsx";

/* ====================================================
   Useful Websites Component
   ==================================================== 
   This component maintains a static list of websites (with a title,
   description, and URL) and provides a search field that dynamically filters
   the list based on the search term (matching either the title or description).
   Clicking a link opens the website in a new tab.
*/
function UsefulWebsites() {
  const initialWebsites = [

    {
      title: "BNF (British National Formulary) | NICE",
      description: "Key information on the selection, prescribing, dispensing and administration of medicines.",
      url: "https://bnf.nice.org.uk/"
    },
    {
      title: "electronic Medicines Compendium (eMC)",
      description: "Medication  SPC (Summary of Product Characteristics)",
      url: "https://www.medicines.org.uk/emc"
    },
    {
      title: "OpenPrescribing",
      description: "Explore England's prescribing data with OpenPrescribing, built by the Bennett Institute for Applied Data Science at the University of Oxford",
      url: "https://openprescribing.net/"
    },
    {
      title: "EPS Prescription Tracker - Prescription Search",
      description: "Check status of prescriptions on the spine",
      url: "https://portal2.national.ncrs.nhs.uk/prescriptionsadmin/prescriptionsearch"
    },
    {
      title: "Datix Cheshire Incident Reporting Form",
      description: "NHS Cheshire CCG Incident Reporting Form",
      url: "https://nhscheshireccgdatixcloud.gateway.prod-uk.datixcloudiq.co.uk/capture/?form_id=1&module=INC"
    },
    {
      title: "Cheshire MMT",
      description: "Cheshire Medicines Management Website",
      url: "http://www.centralandeasterncheshiremmt.nhs.uk/formulary/chapters"
    },
    {
      title: "Ardens CQC",
      description: "The CQC has developed a suite of clinical searches which are now routinely used when carrying out inspections of GP practices.  The business rules and code sets for these searches are hosted on Ardens Manager and more information can be found in CQC Mythbuster 12. Please note that not all codes are available on the underlying clinical systems, so these may vary.",
      url: "https://www.ardens.org.uk/cqc/"
    },
    {
      title: "EMIS Now - Customer Support",
      description: "Help and support for Emis Web",
      url: "https://www.emisnow.com/csm?id=community_forum&sys_id=dd13a28f1b23eb408ceaa64c2e4bcb2f"
    },
  
    {
      title: "Medicines Supply Tool – Specialist Pharmacy Service",
      description: "SPS :Latest information on supply issues, actions to take, altematives to use, and expected resolution dates. Content provided by DHSC and MVA team, NHS England.",
      url: "https://www.sps.nhs.uk/wp-login.php?redirect_to=https%3A%2F%2Fwww.sps.nhs.uk%2Fhome%2Ftools%2Fmedicines-supply-tool%2F&reauth=1"
    },
    {
      title: "PrescQIPP",
      description: "We do this by producing high quality evidence-based resources and training, and by facilitating networks between NHS organisations and professionals. As a Community Interest Company, we operate on a not-for-profit basis for the benefit of NHS patients and organisations.",
      url: "https://www.prescqipp.info/"
    },

    {
      title: "Statin intolerance pathway",
      description: "The Statin intolerance pathway ings together multiple National Institute for Health and Care Excellence guidance and technology appraisals into a single document, to support a consistent approach to the management of statin intolerance.",
      url: "https://www.england.nhs.uk/aac/publication/statin-intolerance-pathway/"
    },
    {
      title: "NHS Steroid Emergency Card and National Patient Safety Alert | British Thoracic Society | Better lung health for all",
      description: "Steroid card. Patient resources for people with lung disease on high dose inhaled steroids and oral steroids.",
      url: "https://www.brit-thoracic.org.uk/quality-improvement/clinical-resources/asthma/nhs-steroid-emergency-card-and-national-patient-safety-alert/"
    },
    {
      title: "BNF Approximate Conversions and Units",
      description: "Conversion of pounds to kilograms\nConversion of stones to kilograms\nPrescribing for children: weight, height, and sex",
      url: "https://bnf.nice.org.uk/about/approximate-conversions-and-units/"
    },
    {
      title: "CredibleMeds For Healthcare Providers",
      description: "This portal includes QTdrugs.org, a list of drugs categorized by their potential to cause QT prolongation and/or torsades de pointes (TdP).",
      url: "https://crediblemeds.org/healthcare-providers/"
    },
    {
      title: "Dose Equivalent and Changing Opioids The Royal College of Anaesthetists",
      description: "Dose equivalents and changing opioids.",
      url: "https://www.rcoa.ac.uk/faculty-of-pain-medicine/opioids-aware/structured-approach-to-prescribing/dose-equivalents-and-changing-opioids"
    },
    {
      title: "Drugs and driving the law - GOV.UK",
      description: "Medicines affected by drug driving legislation.",
      url: "https://www.gov.uk/drug-driving-law"
    },
    {
      title: "Eye drop quantites",
      description: "Eye Drops – Guidance on Quantities to Prescribe from East Surrey CCG",
      url: "https://www.cambridgeshireandpeterboroughccg.nhs.uk/easysiteweb/getresource.axd?assetid=3195&type=0&servicetype=1"
    },
    {
      title: "For GPs opioids and chronic pain - Oxford University Hospitals",
      description: "Resources for primary care regarding opioids and chronic pain. Includes opioid reduction templates.",
      url: "https://www.ouh.nhs.uk/services/referrals/pain/opioids-chronic-pain.aspx"
    },
    {
      title: "Herbal medicines: Memorial Sloan Kettering Cancer Centre",
      description: "Memorial Sloan Kettering Cancer Center’s About Herbs database, a tool for the public as well as healthcare professionals, can help you figure out the value of using common herbs and other dietary supplements.Provides  evidence-based information on traditional and proven uses, potential benefits, possible adverse effects and interactions with other herbs or medicines",
      url: "https://www.mskcc.org/cancer-care/diagnosis-treatment/symptom-management/integrative-medicine/herbs"
    },
    {
      title: "MedOptimise - MedOptimise",
      description: "Allows NHS ICBs to strategically manage all aspects of medicines optimisation with advanced insights, project oversight, and financial control, Requires account",
      url: "https://analysis.medoptimise.co.uk/"
    },
    {
      title: "NEWT Guidelines",
      description: "A guide to administration of medication to patients with swallowing problems.  Advises if tablets can be crushed etc",
      url: "https://access.newtguidelines.com/"
    },
    {
      title: "Serious shortage protocols (SSPs) | NHSBSA",
      description: "SSPs issued by the  Department of Health and Social Care (DHSC) if they decide there is a serious shortage/supply issue of a specific medicine or appliance.",
      url: "https://www.nhsbsa.nhs.uk/pharmacies-gp-practices-and-appliance-contractors/serious-shortage-protocols-ssps"
    },
    {
      title: "Prescribing and ordering available pancreatic enzyme replacement therapies – SPS - Specialist Pharmacy Service – The first stop for professional medicines advice",
      description: "Prescribing and ordering available pancreatic enzyme replacement therapies",
      url: "https://www.sps.nhs.uk/articles/prescribing-and-ordering-available-pancreatic-enzyme-replacement-therapies/"
    },
    {
      title: "Toxbase Welcome",
      description: "TOXBASE provides health professionals with advice on the features and management of poisoning of around 21,000 products and substances, together with information for chemical incidents, and monographs from the UK Teratology Information Service.",
      url: "https://www.toxbase.org/"
    },
    {
      title: "Controlled Drug (CD) Reporting",
      description: "Website for reporting controlled drug incidents or concerns.",
      url: "https://www.cdreporting.co.uk/"
    },
    {
      title: "Steroid Conversion Calculator - MDCalc",
      description: "Converts steroid dosages using dosing equivalencies.",
      url: "https://www.mdcalc.com/steroid-conversion-calculator"
    },
    {
      title: "Complete IDDSI Framework ",
      description: "Dysphagia and drink thickness.",
      url: "https://www.iddsi.org/images/Publications-Resources/DetailedDefnTestMethods/English/V2DetailedDefnEnglish31july2019.pdf"
    },
    {
    title: " PrescQIPP Over the counter items - GP guide to self care",
    description: "Provides guidance on selft care and OTC medication.",
    url: "https://www.prescqipp.info/media/ajsgw3bs/320-over-the-counter-items-2-0.pdff"
  }
    
  ];
  
    const [searchTerm, setSearchTerm] = useState('');
  
    // Filter the websites based on the search term (case insensitive)
    const filteredWebsites = initialWebsites.filter(site =>
      site.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      site.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  
    return (
      <div className="tool">
        <h2>Useful Websites</h2>
        <div className="input-group">
          <label>
            Search:
            <input
              type="text"
              value={searchTerm}
              onChange={e => setSearchTerm(e.target.value)}
            />
          </label>
        </div>
        <ul>
          {filteredWebsites.map((site, index) => (
            <li key={index}>
              <a href={site.url} target="_blank" rel="noopener noreferrer">
                {site.title}
              </a>{" "}
              - {site.description}
            </li>
          ))}
        </ul>
        <FeedbackLink toolName="Useful Websites Tool" emailAddress="caroline@toolsforpharmacists.com" />
      </div>
    );
  }

  export default UsefulWebsites;

