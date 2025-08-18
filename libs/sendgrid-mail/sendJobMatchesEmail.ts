import sgMail from '@sendgrid/mail';

const emailSender = process.env.SENDGRID_SENDER_EMAIL!;
const enabled = true;
const url = 'https://www.greeka.com';

interface JobMatch {
  id: string;
  title: string;
  companyName: string;
  logo: { url: string };
  whatYouBring: string;
}

export const sendJobMatchesEmail = async (
  firstName: string,
  email: string,
  matches: any,
  preference: string,
) => {
  // Send email to user
  // console.log(emailSender);
  // console.log(email);

  if (enabled) {
    const msg = {
      to: email,
      from: emailSender,
      subject: 'New job matches on greeka',
      text: 'You have new job matches',
      html: `<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta http-equiv="Content-Type" content="text/html charset=UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>greeka Job Matches</title>

</head>

<body
  style="font-family: Arial, sans-serif; margin: 0; padding: 0; background-color: #F6F8FC; display: flex; justify-content: center; align-items: center; min-height: 100vh;">
  <div class="email-container"
    style="max-width: 600px; margin: 0 auto; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden; position: relative; z-index: 1; background: url('https://www.greeka.com/_next/static/media/new-ui-bg.f2e04d72.png'); background-size: cover; background-position: 0 0;">
    <div class="header" style="background: linear-gradient(180deg, #00FBDF 28.18%, rgba(0, 251, 223, 0.74) 43.98%, rgba(1, 186, 248, 0.74) 85.64%); color: #000; text-transform: uppercase; font-weight: bolder; text-align: center; padding: 20px;">
      <img src="https://www.greeka.com/assets/images/greeka-1.png" width="300">
    </div>
    <div class="content"
      style="padding: 20px; background: #fff; width: 80%; margin-left: auto; margin-right: auto; position: relative; color: #333333;">
      <h2 class="title"
        style="font-family: Impact; text-transform: uppercase; font-size: 1.34rem; font-weight: 700; line-height: 25.19px; letter-spacing: 0.13em; text-align: center; text-underline-position: from-font; text-decoration-skip-ink: none;">
        You have new job matches, <span style="color: #FF6331;">${firstName}</span></h2>
      <p class="subtitle"
        style="font-family: Courier New; font-size: 1rem; padding: 0 30px; font-weight: 400; line-height: 18.01px; text-align: center; text-underline-position: from-font; text-decoration-skip-ink: none;">
        Explore today’s top matches. Tailored to your prefrences, experiences, and skill.</p>

      <!-- Job Match 1 -->
      ${matches.items
        .map(
          (item: JobMatch) => `<div class="job-card"
        style="margin-bottom: 20px; padding: 19px 27px 19px 27px; border: 1px solid #000; border-radius: 13.21px;">
        <img
          src="${
            item.logo?.url ||
            'https://www.greeka.com/assets/images/greekaDefaultImage.png'
          }"
          width="144px">
        <h2
          style="font-family: Arial; font-size: 1.2rem; font-weight: 700; line-height: 18.01px; text-align: left; text-underline-position: from-font; text-decoration-skip-ink: none;">
          ${item?.title || 'no info'}</h2>
        <p class="company"
          style="font-family: Arial; font-size: .9rem; font-weight: 700; line-height: 18.01px; text-align: left; text-underline-position: from-font; text-decoration-skip-ink: none;">
          ${item?.companyName || 'no info'}</p>  
        </p>
        <p class="decription"
          style="font-family: Arial; font-size: .8rem; font-weight: 400; line-height: 18.01px; text-align: left; text-underline-position: from-font; text-decoration-skip-ink: none;">
          ${item?.whatYouBring.slice(0, 100) + `... Click on Apply Now to read more`}
        </p>
        <a href="https://www.greeka.com/current-job/${item?.id}" class="apply-button"
          style="padding: 8px; gap: 14.28px; display: block; border-radius: 42.83px; letter-spacing: 0.13em; text-transform: uppercase; font-family: Impact, sans-serif; font-size: 1rem; font-weight: 600; text-align: center; opacity: 0px; text-decoration: none; color: #000; border: 2px solid #000000;">Apply
          Now</a>
        </div>`,
        )
        .join('')}

        <div class="bottom-container" style="text-align: center; margin-bottom: 1rem;">
          <a href="https://www.greeka.com/account/matches"
            style="padding: 12px 50px 12px 50px; text-transform: uppercase; border-radius: 60px; display: inline-block; margin-top: 15px; color: #ffffff; background-color: #000; text-decoration: none; font-family: Courier New; font-size: 1rem; font-weight: 300;">CHECK OUT MORE JOBS</a>
        </div>

      </div>
      <div class="footer"
        style="background-color: transparent; text-align: center; padding: 15px; font-size: 1rem; color: #000;">
        <p style="font-family: Impact;
              font-size: 1.34rem;
              font-weight: 700;">
          Receive these notifications:
        </p>
        <div class="receive-container"
          style="display: flex;  max-width: 100%; margin: 0 auto; padding: 10px; justify-content: center;
    align-items: center;">
          <a class="secondary-button"
            style="margin: 0px 10px; padding: 15px; display: block; width: 100%; text-align: center; text-transform: uppercase; border-radius: 42.83px; font-family: Impact, sans-serif; font-size: 14px; font-weight: bold; text-decoration: none; letter-spacing: 0.02em; border: 2px solid #000; color: #000; background: ${
              preference === 'Daily'
                ? 'linear-gradient(180deg, #00FBDF 28.18%, rgba(0, 251, 223, 0.74) 43.98%, rgba(1, 186, 248, 0.74) 85.64%)'
                : 'transparent'
            };" href="${url}/account/you/account-details?email=true">Daily</a>
          <a class="secondary-button"
            style="padding: 15px; display: block; width: 100%; text-align: center; text-transform: uppercase; border-radius: 42.83px; font-family: Impact, sans-serif; font-size: 14px; font-weight: bold; text-decoration: none; letter-spacing: 0.02em; border: 2px solid #000; color: #000; background: ${
              preference === 'Weekly'
                ? 'linear-gradient(180deg, #00FBDF 28.18%, rgba(0, 251, 223, 0.74) 43.98%, rgba(1, 186, 248, 0.74) 85.64%)'
                : 'transparent'
            };" href="${url}/account/you/account-details?email=true">Weekly</a>
          <a class="secondary-button"
            style="margin: 0px 10px; padding: 15px; display: block; width: 100%; text-align: center; text-transform: uppercase; border-radius: 42.83px; font-family: Impact, sans-serif; font-size: 14px; font-weight: bold; text-decoration: none; letter-spacing: 0.02em; border: 2px solid #000; color: #000; background: ${
              preference === 'Monthly'
                ? 'linear-gradient(180deg, #00FBDF 28.18%, rgba(0, 251, 223, 0.74) 43.98%, rgba(1, 186, 248, 0.74) 85.64%)'
                : 'transparent'
            };" href="${url}/account/you/account-details?email=true">Monthly</a>
        </div>
        <div class="receive-container"
          style="display: flex; align-items: center; justify-content: center; margin: 1rem 0;">
          <a class="secondary-button"
            style="padding: 14.28px 55.66px; gap: 14.28px; display: block; border-radius: 42.83px; letter-spacing: 0.13em; text-transform: uppercase; font-family: Impact, sans-serif; font-size: 1rem; font-weight: 400; opacity: 0px; text-decoration: none; width: 100%; border: 2px solid #000000; color: #000;" href="${url}/account/you/account-details?email=true">Change
            Email Frequency</a>
        </div>

        <p class="subtitle" style="font-family: Courier New; font-size: 1rem; font-weight: 400; line-height: 15.01px; text-align: center; text-underline-position: from-font; text-decoration-skip-ink: none;">
          &copy; greeka is a jobs marketplace for the Buildings, Infrastructure and Energy sectors.</p>
        <div style="max-width: 300px; padding: 6px 40px; margin: 20px auto; background-color: #ffffff; box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1); overflow: hidden; position: relative; z-index: 1; background: linear-gradient(180deg, #00FBDF 28.18%, rgba(0, 251, 223, 0.74) 64.09%, rgba(1, 186, 248, 0.74) 100%);
">
        <img src="https://www.greeka.com/assets/images/greeka-2.png" width="300">
      </div>
        <p><a href="${url}/account/you/account-details?email=true" style="color: #000;">Unsubscribe</a></p>
      </div>
    </div>
</body>

</html>`,
    };

    try {
      await sgMail.send(msg);
      console.log('Email sent to:', email);
    } catch (error) {
      console.error(error);
      if (error.response) {
        console.error(error.response.body);
      }
    }
  }
};
