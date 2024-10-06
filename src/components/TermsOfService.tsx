import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Typography from '@mui/material/Typography';

const TermsOfService = () => {
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
      <Box>
        <Typography variant="h2" sx={{ fontWeight: 'bold' }} gutterBottom>
          The UpskillClub Terms of Service
        </Typography>
        <Typography variant="h5" color="text.secondary" sx={{ fontWeight: 'medium' }} gutterBottom>
          Effective date: October 10, 2024
        </Typography>
      </Box>
      <Box>
        <Typography variant="body1" gutterBottom>
          {`Welcome to the UpskillClub Club ("we," "our," or "the UpskillClub"). By accessing and participating in our services, events, or platforms, you agree to comply with and be bound by the following Terms of Service. Please review them carefully.`}
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          1. Acceptance of Terms
        </Typography>
        <Typography variant="body1">
          By joining the UpskillClub Club and using our services, you agree to comply with these Terms of Service, all
          applicable laws and regulations, and any additional terms or guidelines provided during specific activities or
          events. If you do not agree to these terms, please discontinue your participation.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          2. Eligibility
        </Typography>
        <Typography variant="body1">
          Participation in the UpskillClub Club is open to individuals who are 16 years of age or older. By joining, you
          represent that you meet this age requirement and have the authority to enter into this agreement.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          3. Member Responsibilities
        </Typography>
        <Typography variant="body1">As a member of the Club, you agree to:</Typography>
        <ul>
          <li>Respect the rights and dignity of other members.</li>
          <li>Not engage in disruptive, harmful, or unlawful activities.</li>
          <li>Abide by the guidelines provided for events, activities, or learning platforms.</li>
          <li>Provide accurate and current information when registering or participating in events.</li>
          <li>Use the Club’s resources for educational and collaborative purposes only.</li>
        </ul>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          4. Prohibited Conduct
        </Typography>
        <Typography variant="body1">You agree not to:</Typography>
        <ul>
          <li>Harass, abuse, or harm other members of the Club.</li>
          <li>Post or share offensive, inappropriate, or illegal content on Club platforms.</li>
          <li>Misrepresent your identity or affiliation with any person or organization.</li>
          <li>Engage in any activity that would disrupt the normal operations of the Club.</li>
          <li>Violate any local, state, or international law during participation.</li>
        </ul>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          5. Intellectual Property
        </Typography>
        <Typography variant="body1">
          All content, materials, and resources provided by the UpskillClub Club are protected by intellectual property
          laws. You may not use, copy, or distribute any materials from the Club without express written permission
          unless otherwise stated.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          6. Limitation of Liability
        </Typography>
        <Typography variant="body1">
          The UpskillClub Club is not liable for any direct, indirect, incidental, or consequential damages resulting
          from your use of the Club’s services or participation in events, unless required by law. We do not guarantee
          any specific outcomes from your participation.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          7. Modifications to Services
        </Typography>
        <Typography variant="body1">
          We reserve the right to modify, suspend, or discontinue any aspect of the UpskillClub Club’s services or
          platforms at any time without prior notice. We are not liable for any inconvenience or loss resulting from
          such changes.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          8. Termination of Membership
        </Typography>
        <Typography variant="body1">
          We reserve the right to terminate or suspend your membership at our discretion if you violate these Terms of
          Service or engage in inappropriate behavior. Upon termination, your access to Club resources and events will
          be revoked.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          9. Changes to the Terms of Service
        </Typography>
        <Typography variant="body1">
          We may update these Terms of Service from time to time to reflect changes in our practices or legal
          requirements. We will notify members of any material changes, and continued participation in the Club after
          such changes constitutes acceptance of the revised terms.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          10. Governing Law
        </Typography>
        <Typography variant="body1">
          These Terms of Service are governed by and construed in accordance with the Indian laws, without regard to its
          conflict of law provisions. Any legal action arising from your use of the Club’s services shall be brought in
          the appropriate courts of India law.
        </Typography>
      </Box>

      <Box>
        <Typography variant="h5" component="h2" gutterBottom>
          11. Contact Information
        </Typography>
        <Typography variant="body1" gutterBottom>
          If you have any questions or concerns regarding these Terms of Service, please contact us at:
        </Typography>
        <Typography variant="body1">
          <strong>The UpskillClub Club</strong>
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

export { TermsOfService };
