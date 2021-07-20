import React, { FunctionComponent, useState } from 'react';
import { useHistory } from 'react-router-dom';
import Pokemon from '../models/pokemon';
import formatType from '../helpers/format-type';

type Props = {
    pokemon: Pokemon
};

type Field = {
    value?: any,
    error?: string,
    isValid?: boolean
};

type Form = {
    name: Field,
    hp: Field,
    cp: Field,
    types: Field
};

const PokemonForm: FunctionComponent<Props> = ({ pokemon }) => {

    const [form, setForm] = useState<Form>({
        name: { value: pokemon.name, isValid: true },
        hp: { value: pokemon.hp, isValid: true },
        cp: { value: pokemon.cp, isValid: true },
        types: { value: pokemon.types, isValid: true }
    });

    const history = useHistory();

    const types: string[] = [
        'Plante', 'Feu', 'Eau', 'Insecte', 'Normal', 'Electrik',
        'Poison', 'Fée', 'Vol', 'Combat', 'Psy'
    ];

    const hasType = (type: string): boolean => {
        return form.types.value.includes(type);
    }

    const handelInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const fieldName: string = e.target.name;
        const fieldValue: string = e.target.value;
        const newField: Field = { [fieldName]: { value: fieldValue } };

        setForm({ ...form, ...newField });
    }

    const selectType = (type: string, e: React.ChangeEvent<HTMLInputElement>): void => {
        const checked = e.target.checked;
        let newField: Field;

        if (checked) {
            // si l'utiisateur coche un type, l'ajoute à la liste des types du pokemon
            const newTypes: string[] = form.types.value.concat([type]);
            newField = { value: newTypes };
        } else {
            // si l'utilisateur d"coche un type, on le retir de la liste des types du pokemon
            const newTypes: string[] = form.types.value.filter((currenType: string) => currenType !== type);
            newField = { value: newTypes };
        }

        setForm({ ...form, ...{ types: newField } });
    }

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
      const isFormValid = validateForm();
      if (isFormValid) {
          history.push(`/pokemons/${pokemon.id}`);
      }
        history.push(`/pokemons/${pokemon.id}`)
    };

    const validateForm = () => {
        let newForm: Form = form;


        //Validator name
        if (!/^[a-zA-Zàéè] {3,25}$/.test(form.name.value)) {
            const errorMsg: string = 'les points de vie du pokémon sont compris entre 0 et 999.';
            const newField: Field = { value: form.hp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ hp: newField } };
        } else {
            const newField: Field = { value: form.hp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ hp: newField } };
        }

        // Vaidator cp 
        if (!/^ [0 - 9]{ 1, 2 } $ /.test(form.cp.value)) {
            const errorMsg: string = 'les dégats du pokémon sont compris entr 0 et 99';
            const newField: Field = { value: form.cp.value, error: errorMsg, isValid: false };
            newForm = { ...newForm, ...{ cp: newField } };
        } else {
            const newField: Field = { value: form.hp.value, error: '', isValid: true };
            newForm = { ...newForm, ...{ cp: newField } };
        }
        setForm(newForm);
        return newForm.name.isValid && newForm.hp.isValid && newForm.cp.isValid;
    }

    const isTypeValid = (type: string): boolean => {
        if (form.types.value.length === 1 && hasType(type)) {
            return false;
        }
        if (form.types.value.length >= 3 && !hasType(type)) {
            return false;
        }
        return true;
    }


    return (
        <form onSubmit={e => handleSubmit(e)}>
            <div className="row">
                <div className="col s12 m8 offset-m2">
                    <div className="card hoverable">
                        <div className="card-image">
                            <img src={pokemon.picture} alt={pokemon.name} style={{ width: '250px', margin: '0 auto' }} />
                        </div>
                        <div className="card-stacked">
                            <div className="card-content">
                                {/* Pokemon name */}
                                <div className="form-group">
                                    <label htmlFor="name">Nom</label>
                                    <input id="name" name="name" type="text" className="form-control" value={form.name.value} onChange={e => handelInputChange(e)}></input>
                                </div>
                                {/* Pokemon hp */}
                                <div className="form-group">
                                    <label htmlFor="hp">Point de vie</label>
                                    <input id="hp" name="hp" type="number" className="form-control" value={form.hp.value} onChange={e => handelInputChange(e)}></input>
                                </div>
                                {/* Pokemon cp */}
                                <div className="form-group">
                                    <label htmlFor="cp">Dégâts</label>
                                    <input id="cp" name="cp" type="number" className="form-control" value={form.cp.value} onChange={e => handelInputChange(e)}></input>
                                </div>
                                {/* Pokemon types */}
                                <div className="form-group">
                                    <label>Types</label>
                                    {types.map(type => (
                                        <div key={type} style={{ marginBottom: '10px' }}>
                                            <label>
                                                <input id={type} type="checkbox" className="filled-in" value={type} disabled={!isTypeValid(type)} checked={hasType(type)} onChange={e => selectType(type, e)}></input>
                                                <span>
                                                    <p className={formatType(type)}>{type}</p>
                                                </span>
                                            </label>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="card-action center">
                                {/* Submit button */}
                                <button type="submit" className="btn">Valider</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    );
};

export default PokemonForm;