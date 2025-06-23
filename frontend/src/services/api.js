const API_BASE_URL = process.env.NODE_ENV === 'production' 
  ? 'https://bangkoklore-api.onrender.com'
  : 'http://localhost:5000';


export const storyAPI = {
    getAllStories: async () =>{
        try{
            const response = await fetch(`${API_BASE_URL}/api/getstories`);
            const data = await response.json();
            if(data.success){
                return data.stories;
            }
            else{
                throw new Error(data.error || "No Stories found");
            }
        }
        catch(error){
            console.error("error fetching stories",error);
            throw error;
        }
    },
    
    submitStory: async (storyData) => {
    try {
      const response = await fetch(`${API_BASE_URL}/api/submit-lore`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(storyData)
      });
      
      const data = await response.json();
      
      if (response.ok && data.success) {
        return data;
      } else {
        throw new Error(data.error || 'Failed to submit story');
      }
    } catch (error) {
      console.error('Error submitting story:', error);
      throw error;
    }
  },
   buyRaffleTicket: async () => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/raffle-ticket`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                }
            });
            
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error buying raffle ticket:', error);
            throw error;
        }
    },
     createCheckoutSession: async (amount = 100) => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/create-checkout-session`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ amount })
            });
            
            const data = await response.json();
            
            if (response.ok) {
                return data;
            } else {
                throw new Error(data.error || 'Failed to create checkout session');
            }
        } catch (error) {
            console.error('Error creating checkout session:', error);
            throw error;
        }
      },
      getTicketCount: async (userId = 'demo_user') => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/raffle-tickets/${userId}`);
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error getting ticket count:', error);
            throw error;
        }
    },


    testWebhook: async (eventType = 'checkout.session.completed') => {
        try {
            const response = await fetch(`${API_BASE_URL}/api/test-webhook`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ type: eventType })
            });
            const data = await response.json();
            return data;
        } catch (error) {
            console.error('Error testing webhook:', error);
            throw error;
        }
    }
};