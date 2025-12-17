// Analytics events as specified in Zillow.md
export const trackZillowEvent = (eventName: string, parameters: Record<string, any> = {}) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, {
      page_location: window.location.href,
      timestamp: new Date().toISOString(),
      ...parameters
    });
  }
};

// Specific tracking functions for Zillow funnel
export const analytics = {
  // Homepage widget clicks
  homepageZillowClick: (ctaLabel: string) => {
    trackZillowEvent('homepage_zillow_clicks', {
      cta_label: ctaLabel,
      widget_position: 'zillow_section'
    });
  },

  // Real estate page views
  realEstatePageView: () => {
    trackZillowEvent('explore_page_views', {
      page: '/real-estate'
    });
  },

  // Lead submissions
  leadSubmit: (leadData: {
    name: string;
    email: string;
    interest: string;
    source: string;
  }) => {
    trackZillowEvent('lead_submits', {
      lead_intent: 'zillow',
      interest_type: leadData.interest,
      utm_source: leadData.source,
      conversion_page: '/real-estate'
    });
    
    // Also track the specific real estate lead event
    trackZillowEvent('real_estate_lead_submit', {
      lead_type: leadData.interest,
      form_location: 'real_estate_page'
    });
  },

  // Zillow profile clicks
  zillowProfileClick: (source: string, ctaLabel: string) => {
    trackZillowEvent('zillow_outbound_clicks', {
      referrer_source: source,
      cta_label: ctaLabel
    });
    
    // Also track the specific Maria Zillow click event
    trackZillowEvent('maria_zillow_profile_click', {
      referrer_source: source,
      cta_label: ctaLabel
    });
  },

  // Property search interactions
  propertySearch: (searchParams: Record<string, string>) => {
    trackZillowEvent('property_search_click', {
      search_location: searchParams.location,
      price_range: `${searchParams.priceMin}-${searchParams.priceMax}`,
      beds: searchParams.beds,
      baths: searchParams.baths
    });
  },

  // Featured listing clicks
  featuredListingClick: (listing: { price: string; address: string }) => {
    trackZillowEvent('featured_listing_click', {
      listing_price: listing.price,
      listing_address: listing.address
    });
  },

  // Neighborhood guide interactions
  neighborhoodClick: (neighborhoodName: string) => {
    trackZillowEvent('neighborhood_guide_click', {
      neighborhood_name: neighborhoodName
    });
  },

  // Video engagement from real estate context
  videoEngagement: (videoTitle: string, source: string) => {
    trackZillowEvent('video_plays', {
      video_title: videoTitle,
      referrer_source: source,
      context: 'real_estate_funnel'
    });
  }
};

// Conversion rate calculation helper
export const calculateConversionRate = (leads: number, pageViews: number): number => {
  return pageViews > 0 ? (leads / pageViews) * 100 : 0;
};