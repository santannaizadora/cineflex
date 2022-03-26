import {useState } from "react";
const RenderSeats = (props) => {
    const { isAvailable, id, name, setSeats, seats, setSeatsName, seatsName } = props;
    const [isSelected, setIsSelected] = useState(false);
    const cssColor = isAvailable ? 'available' : 'unavailable';
    const cssSelected = isSelected ? 'selected' : ''; 
    return (
        <div key={id} className="seat">
            <div
                className={`seat-number ${cssColor} ${cssSelected}`}
                onClick={() => {
                    isAvailable? setIsSelected(!isSelected) : alert('Esse assento não está disponível');
                    if(!isSelected){
                        setSeats(seats.concat(id))
                        setSeatsName(seatsName.concat(name))
                    }else{setSeats(
                        [...seats.filter(seat => seat !== id)])
                        setSeatsName([...seatsName.filter(seatName => seatName !== name)])
                    }
                }}
            >{name}</div>
        </div>
    )
};

export default RenderSeats;