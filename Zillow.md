# Maria in the Neighborhood – Zillow Integration

**Maria's Zillow Profile:** https://www.zillow.com/profile/maria%20woodsca

### Purpose

Drive traffic from social content to Maria's Zillow profile while capturing leads and building engagement.

### Primary Outcomes

- Route social followers to Maria's real estate services
- Capture leads before sending to Zillow
- Build trust through neighborhood content + real estate expertise

### Key Performance Indicators (KPIs)

- Email / contact submissions (weekly)
- Social follows and click-throughs (daily / weekly)
- Video plays and average watch time (per episode)
- Zillow link engagement (monthly)
- “Best of” and calendar click-outs (monthly partner report)

## Tracking Zillow Traffic

### Step 1: Homepage Widget Setup

**Widget Type**

- Zillow “Search Homes” or “Agent Listings” widget
- Embedded under **Explore La Jolla Homes**

**Why**

- Routes users through an internal tracking layer before Zillow

**Maria's Profile**

- https://www.zillow.com/profile/maria%20woodsca
- Track all outbound clicks to this URL

---

### Step 2: Analytics Tracking (GTM + GA4)

- Event: `maria_zillow_click`
- Trigger: Click URL contains `zillow.com/profile/maria%20woodsca`
- Parameters:
  - page_location
  - cta_label
  - referrer_source

---

### Step 3: Real Estate Landing Page (`/real-estate`)

#### Page Layout

**Header**

- Hero image: _Your La Jolla Real Estate Expert_
- Text: "From neighborhood stories to dream homes - let Maria guide your La Jolla journey"
- CTA: **Connect with Maria on Zillow**

**Maria's Credentials**

- Local expertise highlight
- Recent sales/testimonials
- Neighborhood knowledge from videos

**Lead Capture Form**

- Headline: "Get personalized La Jolla market insights"
- Fields: Name, Email, Phone (optional), Looking to Buy/Sell
- CTA: "Connect with Maria"

**Direct Zillow Link**

- "View Maria's Zillow Profile" → https://www.zillow.com/profile/maria%20woodsca

**Analytics Events**

- `real_estate_lead_submit`
- `maria_zillow_profile_click`

---

### Step 4: Data Flow & Automation

**On Lead Submit**

```json
{
  "first_name": "Alex",
  "email": "alex@example.com",
  "lead_intent": "zillow",
  "page": "/explore-la-jolla-homes",
  "utm_source": "homepage_widget"
}
```

**Automation**

- CRM tag: Zillow Intent
- Auto-reply email or SMS
- Internal alert to Maria

---

### Step 5: Funnel Metrics

| Metric                 | Description               |
| ---------------------- | ------------------------- |
| homepage_zillow_clicks | Homepage widget clicks    |
| explore_page_views     | Zillow landing page views |
| lead_submits           | Captured leads            |
| zillow_outbound_clicks | Clicks to Zillow          |
| lead_rate              | Conversion %              |
| return_visitors        | Repeat visits             |

---
