/* eslint-disable no-prototype-builtins */
// import React from 'react'
// import { Helmet } from 'react-helmet-async'
// import { gtagID } from './variableDefaults'

// Change Header of a page for title, seo, and analytics purposes
// export const seoPageTags = (title) => {
//   // console.log('helmet title ->', title)
//   return (
//     <>
//       <Helmet>

//         { /* Standard metadata tags */ }
//         {title === 'Home' ?
//           <title>Philip Sopher — Web Developer — {title}</title>
//           :
//           <title>Philip Sopher — {title}</title>
//         }
//         {/* <meta name='description' content={'Philip Sopher is a full stack web developer. He specializing in turning ideas for software products into MVPs. Come check out his work.'} /> */}

//         {/* Referrer Policy */}
//         <meta name="referrer" content="origin" />

//         { /* Facebook tags */ }
//         {/* <meta property="og:type" content={'website'} />
//         <meta property="og:title" content={`Philip Sopher — Web Developer — ${title}`} />
//         <meta property="og:description" content={'Philip Sopher is a full stack web developer. He specializing in turning ideas for software products into MVPs. Come check out his work.'} /> */}

//         {/* Yandex Verification */}
//         {/* <meta name="yandex-verification" content="08a79e53272c53b3" /> */}

//         { /* Twitter tags */ }
//         <meta name="twitter:creator" content={'SimCap'} />
//         <meta name="twitter:card" content={'website'} />
//         <meta name="twitter:title" content={`Philip Sopher — Web Developer — ${title}`} />
//         <meta name="twitter:description" content={'Philip Sopher is a full stack web developer. He specializing in turning ideas for software products into MVPs. Come check out his work.'} />

//         {/* Google Analytics — Must be at bottom of Helmet */}
//         <script async src={`https://www.googletagmanager.com/gtag/js?id=${gtagID}`}></script>
//         <script>
//           {`
//             window.dataLayer = window.dataLayer || [];
//             function gtag(){dataLayer.push(arguments);}
//             gtag('js', new Date());
//             gtag('config', '${gtagID}');
//           `}
//         </script>
//       </Helmet>
//     </>
//   )
// }

// Send a custom analytics event to Google Analytics
// export const customAnalyticsEvent = (eventName, value, category, label, screenName) => {
//   if (typeof window !== 'undefined' && window.hasOwnProperty('gtag')) {
//     window.gtag('event', eventName, {
//       value: value,
//       event_category: category,
//       event_label: label,
//       screen_name: screenName,
//     })
//   }
// }