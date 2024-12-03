import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import SEO from '../components/SEO';
import ReactMarkdown from 'react-markdown';

const cookiePolicyContent = `# Cookie Policy

Last updated: October 10, 2024

This Cookies Policy explains what Cookies are and how We use them. You should read this policy so You can understand what type of cookies We use, or the information We collect using Cookies and how that information is used.

Cookies do not typically contain any information that personally identifies a user, but personal information that we store about You may be linked to the information stored in and obtained from Cookies. For further information on how We use, store and keep your personal data secure, see our Privacy Policy.

We do not store sensitive personal information, such as mailing addresses, account passwords, etc. in the Cookies We use.

## Interpretation and Definitions

### Interpretation

The words of which the initial letter is capitalized have meanings defined under the following conditions. The following definitions shall have the same meaning regardless of whether they appear in singular or in plural.

### Definitions

For the purposes of this Cookies Policy:

-   **Company** (referred to as either "the Company", "We", "Us" or "Our" in this Cookies Policy) refers to uaeparkinglocator.com/.
-   **Cookies** means small files that are placed on Your computer, mobile device or any other device by a website, containing details of your browsing history on that website among its many uses.
-   **Website** refers to uaeparkinglocator.com/, accessible from [https://uaeparkinglocator.com/](https://uaeparkinglocator.com/)
-   **You** means the individual accessing or using the Website, or a company, or any legal entity on behalf of which such individual is accessing or using the Website, as applicable.

## The use of the Cookies

### Type of Cookies We Use

Cookies can be "Persistent" or "Session" Cookies. Persistent Cookies remain on your personal computer or mobile device when You go offline, while Session Cookies are deleted as soon as You close your web browser.

We use both session and persistent Cookies for the purposes set out below:

-   **Necessary / Essential Cookies** Type: Session Cookies Administered by: Us Purpose: These Cookies are essential to provide You with services available through the Website and to enable You to use some of its features. They help to authenticate users and prevent fraudulent use of user accounts. Without these Cookies, the services that You have asked for cannot be provided, and We only use these Cookies to provide You with those services.
-   **Functionality Cookies** Type: Persistent Cookies Administered by: Us Purpose: These Cookies allow us to remember choices You make when You use the Website, such as remembering your login details or language preference. The purpose of these Cookies is to provide You with a more personal experience and to avoid You having to re-enter your preferences every time You use the Website.

### Your Choices Regarding Cookies

If You prefer to avoid the use of Cookies on the Website, first You must disable the use of Cookies in your browser and then delete the Cookies saved in your browser associated with this website. You may use this option for preventing the use of Cookies at any time.

If You do not accept Our Cookies, You may experience some inconvenience in your use of the Website and some features may not function properly.

If You'd like to delete Cookies or instruct your web browser to delete or refuse Cookies, please visit the help pages of your web browser.

-   For the Chrome web browser, please visit this page from Google: [https://support.google.com/accounts/answer/32050](https://support.google.com/accounts/answer/32050)
-   For the Internet Explorer web browser, please visit this page from Microsoft: [http://support.microsoft.com/kb/278835](http://support.microsoft.com/kb/278835)
-   For the Firefox web browser, please visit this page from Mozilla: [https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored](https://support.mozilla.org/en-US/kb/delete-cookies-remove-info-websites-stored)
-   For the Safari web browser, please visit this page from Apple: [https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac](https://support.apple.com/guide/safari/manage-cookies-and-website-data-sfri11471/mac)

For any other web browser, please visit your web browser's official web pages.

## How Can I Control Cookies?

You can control and manage cookies in several ways. We inform users that deleting or blocking cookies may affect their user experience and may limit access to some areas or features of this website.

When cookies are not strictly necessary for the operation of our website, we will request your consent to their use on your first visit to our website. Consent can be granted or withdrawn by clicking on "Manage Cookie Preferences" at the top of this page.

You can also change your browser settings to manage and control cookies. You can find more detailed information on how to do this at [https://www.aboutcookies.org/](https://www.aboutcookies.org/).

Any consent to accept or reject cookies is limited to the website where this Cookie Policy is located and not to other websites or pages that may have been linked from our website. For more information on how cookies are used on those websites, please refer to the specific privacy and cookie policies of those websites.

## Contact Us

If you have any questions about this Cookies Policy, You can contact us:

-   By email: contact@uaeparkinglocator.com

This website uses cookies to provide a better user experience to its visitors and to ensure its full functionality.`;

export default function CookiePolicyPage() {
  return (
    <>
      <SEO 
        title="Cookie Policy - UAE Parking Locator"
        description="Learn about how we use cookies and how you can control them on UAE Parking Locator"
        canonical="/cookies"
      >
        <meta name="robots" content="noindex,nofollow" />
      </SEO>
      
      <div className="min-h-screen bg-dark-100">
        <section className="bg-dark-200 bg-hero-pattern py-12">
          <div className="container mx-auto px-4">
            <Link 
              to="/"
              className="inline-flex items-center gap-2 text-gray-400 hover:text-primary-400 mb-4 group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              Back to Home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-white bg-gradient-to-r from-primary-400 to-neon-purple bg-clip-text text-transparent">
              Cookie Policy
            </h1>
            <p className="text-gray-400 mt-2">
              Learn about how we use cookies and how you can control them
            </p>
          </div>
        </section>

        <div className="container mx-auto px-4 py-12">
          <div className="bg-dark-200 rounded-2xl shadow-soft p-6 md:p-8">
            <article className="prose prose-invert prose-lg max-w-none">
              <ReactMarkdown>{cookiePolicyContent}</ReactMarkdown>
            </article>
          </div>
        </div>
      </div>
    </>
  );
}