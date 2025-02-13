import React, { useState, useEffect, useRef } from 'react';

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
        title: "Pharmacy Times",
        description: "Latest news and analysis for pharmacy professionals.",
        url: "https://www.pharmacytimes.com"
      },
      {
        title: "Drugs.com",
        description: "Comprehensive source for drug information.",
        url: "https://www.drugs.com"
      },
      {
        title: "NHS Choices",
        description: "Information and advice on health services.",
        url: "https://www.nhs.uk"
      },
      // You can add more website entries as needed.
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
      </div>
    );
  }

  export default UsefulWebsites;

