import { $authHost, $host } from ".";

export const createType = async (type) =>
    {        
        const {data} = await $authHost.post('api/type', type)
        
        return data
    }

    export const fetchTypes = async () =>
        {
            
            const {data} = await $host.get('api/type')
            
            return data
        }

        export const createBrand = async (brand) =>
            {        
                const {data} = await $authHost.post('api/brand', brand)
                
                return data
            }
        
            export const fetchBrands = async () =>
                {
                    
                    const {data} = await $host.get('api/brand')
                    
                    return data
                }
                
                export const createGood = async (good) =>
                    {        
                        const {data} = await $authHost.post('api/goods', good)
                        
                        return data
                    }
                
                    export const fetchGoods = async (typeId, brandId, page, limit, price) => {
                        const response = await $host.get('/api/goods', {
                          params: {
                            typeId,
                            brandId,
                            page,
                            limit,
                            price,
                          },
                        });
                        return response.data;
                      };
                      

        export const fetchOneGoods = async (id) =>
                        {
                            
                            const {data} = await $host.get('api/goods/'+ id)
                            
                            return data
                        }
                        
                        export const createRating = async (ratingData, userId, goodId) => {
                            console.log(userId, goodId)
                            const { data } = await $authHost.post('api/rating', {
                                rate: ratingData.rating,
                                userId: userId,
                                goodId: goodId
                            });
                            return data;
                        };
                        
                        export const fetchAllRatings = async () => {
                            const { data } = await $host.get('api/rating');
                            return data;
                        };
                        
                        export const fetchRatingsByGoodId = async (goodId) => {
                            const { data } = await $host.get(`api/rating/${goodId}`);
                            return data;
                        };

                        export const addToBasket = async(goodId, userId)=>{
                            console.log("Adding to basket", goodId, userId);
                            
                            const { data } = await $authHost.post('api/basket/add', { goodId, userId });
                            return data
                        }

                        export const getBasket = async (userId) => {
                            try {
                            
                              const { data } = await $authHost.get(`api/basket/${userId}`);
                              
                              return data;  
                            } catch (error) {
                             
                              throw error; 
                            }
                          };
                          export const removeFromBasket = async (basketId, goodId) => {
                            try {
                              const { data } = await $authHost.post('api/basket/remove', { basketId, goodId });
                              return data;
                            } catch (error) {
                              console.error("Ошибка при удалении товара из корзины:", error);
                              throw error;
                            }
                          };
                          export const fetchBasketId = async (userId) => {
                            try {
                              const { data } = await $authHost.get(`api/basket/basket/${userId}`);
                              return data.basketId;  
                            } catch (error) {
                              console.error("Ошибка получения корзины:", error);
                              throw error;
                            }
                          };
