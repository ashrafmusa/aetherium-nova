import React from 'react';
import { Validator } from '../types';
import ValidatorCard from './ValidatorCard';

interface ValidatorListProps {
    validators: Validator[];
    onStake: (validator: Validator) => void;
}

const ValidatorList: React.FC<ValidatorListProps> = ({ validators, onStake }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {validators.map(validator => (
                <ValidatorCard 
                    key={validator.publicKey}
                    validator={validator}
                    onStake={() => onStake(validator)}
                />
            ))}
        </div>
    );
};

export default ValidatorList;
