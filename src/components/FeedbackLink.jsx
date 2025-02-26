import React from 'react';


const FeedbackLink= ({ toolName, emailAddress }) => {
    const subject = encodeURIComponent(`Feedback/Issue for ${toolName}`);
    const body = encodeURIComponent(
      `Hi,\n\nI encountered the following issue with the ${toolName}:\n\n[Please describe the issue here]\n\nThank you.`
    );
    const mailtoLink = `mailto:${emailAddress}?subject=${subject}&body=${body}`;
  
    return (
      <div style={{ marginTop: '1rem' }}>
        <a href={mailtoLink} style={{ textDecoration: 'underline', color: 'blue' }}>
          Report Issue
        </a>
      </div>
    );
  
  
};

export default FeedbackLink;
