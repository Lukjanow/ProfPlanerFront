import {Autocomplete, AutocompleteItem, Snippet} from "@nextui-org/react";
import {animals} from "../stores/testData.js";
import {ThemeSwitcher} from "../components/ThemeSwitcher.jsx";
import {t} from "i18next";
import {LangSwitcher} from "../components/LangSwitcher.jsx";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import axios from "axios";
import {useEffect, useState} from "react";

export default function ComponentPage() {
    const [post, setPost] = useState();

    useEffect(() => {
        axios.get(`https://jsonplaceholder.typicode.com/users`)
            .then(res => {
               setPost(res.data);
            })
    }, []);

    if (!post) return null;

    return (
        <>
            <FontAwesomeIcon icon="fa-brands fa-youtube" size="10x"/>
            <span>
                {t('hello')}
            </span>
            <LangSwitcher/>
            <ThemeSwitcher/>
            <Autocomplete
                label="Select an animal"
                className="max-w-xs"
            >
                {
                    animals.map((animal) => (
                        <AutocompleteItem key={animal.value} value={animal.value}>
                            {animal.label}
                        </AutocompleteItem>
                    ))
                }
            </Autocomplete>

            <Snippet>
                {
                    post.map(person =>
                            <li key={person.id}>{person.name}</li>
                        )
                }
            </Snippet>

        </>
    );
}


