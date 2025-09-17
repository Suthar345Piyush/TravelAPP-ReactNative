import React , {createContext , useContext , useState} from "react";

// adding type safety initially 

export type Trip = {
   id : string;
   location : string;
   startDate? : string;
   endDate?: string;
   image? : string;
   places: string[];
};


type TripContextType = {
   trips : Trip[];
   addTrip : (trip : Trip) => void;
};


const TripContext = createContext<TripContextType>({
   trips : [],
   addTrip : () => {},
});

export const TripProvider = ({children} : {children : React.ReactNode}) => {
    const [trips , setTrips] = useState<Trip[]>([]);

    const addTrip = (trip : Trip) => {
       setTrips((prev) => [trip , ...prev]);
    };


    return (
       <TripContext.Provider value={{trips , addTrip}}>
         {children}
       </TripContext.Provider>
    );
};

export const useTrip = () => useContext(TripContext);

