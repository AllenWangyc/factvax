import React from 'react';
import { useNavigate } from 'react-router-dom';
import './TC.styl';
import { LeftOutlined } from '@ant-design/icons'

const TermsOfServiceAndPrivacyPolicy = () => {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1)
  }

  return (
    <div className="tc-container">
      <div className='back-wrapper'>
        <LeftOutlined
          className='back'
          style={{ fontSize: 24 }}
          onClick={handleBack}
        />
      </div>
      <h1 className="tc-title">Terms of Service and Privacy Policy</h1>

      <section className="tc-section">
        <h2 className="tc-subtitle">Terms of Service</h2>
        <p><strong>Last Updated: 25/01/2025</strong></p>
        <h3 className="tc-heading">Introduction</h3>
        <p>Welcome to "FactVax"! These Terms of Service ("Terms") govern your access to and use of our vaccine information verification plugin (the "Service"). By using the Service, you agree to comply with these Terms. If you do not agree to these Terms, do not use the Service.</p>
        <h3 className="tc-heading">Use of the Service</h3>
        <ul>
          <li><strong>Eligibility:</strong> You must be at least 13 years old to use the Service.</li>
          <li><strong>License:</strong> FactVax grants you a limited, non-exclusive, non-transferable license to use the Service for personal, non-commercial purposes.</li>
          <li><strong>Prohibited Activities:</strong>
            <ul>
              <li>Reverse-engineering or attempting to extract the source code of the Service.</li>
              <li>Using the Service for any illegal or unauthorized purpose.</li>
              <li>Interfering with or disrupting the operation of the Service.</li>
            </ul>
          </li>
        </ul>
        <h3 className="tc-heading">Intellectual Property</h3>
        <p>All content, trademarks, and other intellectual property provided through the Service remain the exclusive property of FactVax or its licensors. Unauthorized use of any materials is strictly prohibited.</p>
        <h3 className="tc-heading">Disclaimer of Warranties</h3>
        <p>The Service is provided "as is" without any warranties, express or implied. FactVax does not guarantee the accuracy, completeness, or reliability of any information provided by the Service.</p>
        <h3 className="tc-heading">Limitation of Liability</h3>
        <p>To the extent permitted by law, FactVax shall not be liable for any indirect, incidental, or consequential damages arising out of your use of the Service.</p>
        <h3 className="tc-heading">Modifications and Termination</h3>
        <p>FactVax reserves the right to modify or discontinue the Service at any time without notice. Your continued use of the Service constitutes acceptance of any changes to these Terms.</p>
        <h3 className="tc-heading">Governing Law</h3>
        <p>These Terms are governed by the laws of [Your Jurisdiction], without regard to its conflict of laws principles.</p>
      </section>

      <section className="tc-section">
        <h2 className="tc-subtitle">Privacy Policy</h2>
        <p><strong>Last Updated: 25/01/2025</strong></p>
        <h3 className="tc-heading">Introduction</h3>
        <p>Welcome to "FactVax". This Privacy Policy outlines our commitment to protecting the privacy and security of your personal information when using our extension. We aim to be transparent about our data practices and respect your privacy rights.</p>
        <h3 className="tc-heading">Information We Collect</h3>
        <ul>
          <li><strong>Engagement Data:</strong> Includes phrases detected on web pages, types of fact-check or scam warnings triggered, and timestamps of these events.</li>
          <li><strong>Anonymized Location Data:</strong> General geographic location (city and country) to understand regional use.</li>
          <li><strong>Technical Data from Mixpanel:</strong> Browser type, version, and screen resolution to improve compatibility.</li>
          <li><strong>Device and Usage Data:</strong> Information about how the extension is used, including data collected by cookies and similar technologies.</li>
        </ul>
        <h3 className="tc-heading">How We Use Your Information</h3>
        <ul>
          <li>Service Improvement: To enhance the effectiveness of the extension.</li>
          <li>Analytics and Performance Monitoring: To analyze usage patterns and identify areas for improvement.</li>
          <li>Troubleshooting and Support: To resolve technical issues and provide user support.</li>
          <li>Legal Compliance and Protection: To comply with legal requirements and protect user safety.</li>
        </ul>
        <h3 className="tc-heading">Data Sharing and Disclosure</h3>
        <ul>
          <li><strong>Service Providers:</strong> We share data with trusted partners who help operate the Service, subject to strict confidentiality agreements.</li>
          <li><strong>Legal Requirements:</strong> To comply with legal processes or prevent harm.</li>
          <li><strong>No Data Sales:</strong> We do not sell or rent personal data.</li>
        </ul>
        <h3 className="tc-heading">User Consent and Control</h3>
        <ul>
          <li>Data Access and Portability: Users have the right to access and request copies of their data.</li>
          <li>Opt-Out: Users may opt out of certain data collection practices by disabling the extension or contacting us directly.</li>
        </ul>
        <h3 className="tc-heading">Data Security</h3>
        <p>We implement measures to protect your data from unauthorized access, disclosure, alteration, or destruction.</p>
        <h3 className="tc-heading">Children's Privacy</h3>
        <p>Our extension is not intended for children under 13. We do not knowingly collect data from children under 13.</p>
        <h3 className="tc-heading">International Users</h3>
        <p>Your data may be processed in countries outside your residence. By using the Service, you consent to this transfer.</p>
        <h3 className="tc-heading">Changes to This Privacy Policy</h3>
        <p>We reserve the right to update this Privacy Policy at any time. Changes will be posted on this page with a revised "Last Updated" date.</p>
        <h3 className="tc-heading">Contact</h3>
        <p>For questions or concerns about our privacy practices, please contact us at <a>info@factvax.ac.nz</a>.</p>
      </section>
    </div>
  );
};

export default TermsOfServiceAndPrivacyPolicy;
