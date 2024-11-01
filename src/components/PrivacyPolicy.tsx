import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';
import { Helmet } from 'react-helmet';

const PrivacyPolicy = () => {
  return (
    <Container
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: 4,
        width: {
          xs: '100%',
          md: '70%',
        },
      }}
    >
      <Helmet>
        <title>Privacy Policy | The Upskill Club</title>
        <meta name="description" content="Learn about The Upskill Club's Privacy Policy, including how we collect, use, and protect your personal information on our platform." />
        <link rel="canonical" href="https://www.theupskillclub.com/privacy-policy" />
        <meta property="og:title" content="Privacy Policy | The Upskill Club" />
        <meta property="og:description" content="Learn about The Upskill Club's Privacy Policy regarding the collection and protection of your personal information." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.theupskillclub.com/privacy-policy" />
      </Helmet>
      <Box>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
          The Upskill Club Privacy Policy
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 'medium' }} gutterBottom>
          Effective date: October 10, 2024
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" gutterBottom>
          {`Your privacy is important to The Upskill Club ("we," "our," or "The Upskill Club"). This Privacy Policy
          outlines how we collect, use, share, and protect your personal information when you engage with the Club,
          including through our website, events, communications, and learning platforms.`}
        </Typography>
      </Box>
      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          1. Information We Collect
        </Typography>

        <Typography variant="h6" component="h3" gutterBottom>
          {`a) Personal Information:`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          When you join The Upskill Club or participate in our events, activities, or platforms, we may collect
          personal information including but not limited to:
        </Typography>
        <ul>
          <li>Full name</li>
          <li>Email address</li>
          <li>Educational background</li>
          <li>Professional details</li>
          <li>Usernames or IDs on learning platforms</li>
          <li>Any information you voluntarily provide during club activities</li>
        </ul>

        <Typography variant="h6" component="h3" gutterBottom>
          {`b) Non-Personal Information:`}
        </Typography>
        <Typography variant="body1" gutterBottom>
          We may collect non-identifying information such as:
        </Typography>
        <ul>
          <li>Browser type</li>
          <li>Device information</li>
          <li>IP address</li>
          <li>Cookies and web analytics data (e.g., site navigation, time spent on pages)</li>
        </ul>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          2. How We Use Your Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          We use the information we collect to:
        </Typography>
        <ul>
          <li>Facilitate participation in club activities and events</li>
          <li>Communicate with members, including sending newsletters, updates, and event notifications</li>
          <li>Personalize learning experiences and collaboration opportunities</li>
          <li>Manage administrative tasks (e.g., membership, event registration)</li>
          <li>{`Improve the Club's offerings based on user feedback and engagement data`}</li>
          <li>Maintain the safety and integrity of our platforms</li>
        </ul>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          3. Sharing Your Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          We respect your privacy and will never sell your personal information. We may share your information in the
          following circumstances:
        </Typography>
        <ul>
          <li>
            <strong>With Consent:</strong> We will share information with your permission.
          </li>
          <li>
            <strong>Service Providers:</strong> We may share information with trusted third-party service providers who
            assist us in operating the Club (e.g., hosting platforms, communication tools), but they are required to
            keep your data secure and only use it for the purposes we specify.
          </li>
          <li>
            <strong>Legal Requirements:</strong> We may disclose information if required to comply with a legal
            obligation or to protect the rights and safety of the Club or its members.
          </li>
        </ul>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          4. Data Security
        </Typography>
        <Typography variant="body1" gutterBottom>
          We take reasonable precautions to safeguard your personal information from unauthorized access, use, or
          disclosure. Our security measures include encryption, secure hosting, and regular reviews of data handling
          practices. However, no method of transmission over the internet is completely secure, and we cannot guarantee
          the absolute security of your information.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          5. Cookies and Tracking
        </Typography>
        <Typography variant="body1" gutterBottom>
          {`We use cookies and other tracking technologies to enhance user experience and analyze usage. You can control
          or disable cookies through your browser settings, but doing so may affect your ability to access some features
          of the Club's platforms.`}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          6. Your Choices
        </Typography>
        <Typography variant="body1" gutterBottom>
          You have the following rights regarding your personal information:
        </Typography>
        <ul>
          <li>
            <strong>Access and Update:</strong> You may request access to the personal data we hold about you and update
            or correct it.
          </li>
          <li>
            <strong>Withdraw Consent:</strong> You can withdraw your consent to receive communications or participation
            in certain Club activities at any time.
          </li>
          <li>
            <strong>Delete Data:</strong> You may request the deletion of your personal data, though certain data may
            need to be retained for legal or operational reasons.
          </li>
        </ul>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          7. Third-Party Links
        </Typography>
        <Typography variant="body1" gutterBottom>
          Our website or communications may contain links to third-party websites. We are not responsible for the
          privacy practices of those websites. We encourage you to review their privacy policies before providing
          personal information.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          8. Changes to This Privacy Policy
        </Typography>
        <Typography variant="body1" gutterBottom>
          We may update this Privacy Policy periodically to reflect changes in our practices or for legal reasons. We
          will notify members of any material changes and update the effective date at the top of this policy.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          9. Contact Us
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you have any questions or concerns about this Privacy Policy or how we handle your personal information,
          please contact us at:
        </Typography>
        <Typography variant="body1" gutterBottom>
          <strong>The UpskillClub</strong>
          <br />
          Email: <a href="mailto:anupam.singh0211@gmail.com">anupam.singh0211@gmail.com</a>
          <br />
          LinkedIn:{' '}
          <a href="https://www.linkedin.com/company/theupskillclub" target="_blank" rel="noopener noreferrer">
            theupskillclub
          </a>
        </Typography>
      </Box>
    </Container>
  );
};

export { PrivacyPolicy };
