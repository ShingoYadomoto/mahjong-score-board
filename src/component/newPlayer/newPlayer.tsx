import React from 'react'
import data from "../../data/infrastructure/data";
import './newPlayer.css'

type NewPlayerProps = {
    onSuccessNewPlayer: () => void;
}

export const NewPlayer: React.FC<NewPlayerProps> = props => {
    const [name, setName] = React.useState("");

    const handleChangeName = (event: React.ChangeEvent<HTMLInputElement>) => {
        setName(event.target.value);
    };

    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();

        data.createPlayer(name)
            .then((response) => {
                props.onSuccessNewPlayer();
                console.log("success new player");
            })
            .catch((e: Error) => {
                console.log(e);
            });
    };

    return (
        <form onSubmit={handleSubmit}>
            <label>
                Name:<input type="text" value={name} onChange={handleChangeName} />
            </label>
            <input type="submit" value="プレイヤーを作成" />
        </form>
    );
}