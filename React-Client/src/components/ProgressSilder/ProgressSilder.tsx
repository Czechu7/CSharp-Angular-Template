import { MdArrowBack, MdArrowForward } from 'react-icons/md';
import { Slider } from '../ui/slider';

type Props = {
    value: number;
    max: number;
    label?: string;
    step?: number;
};

const ProgressSlider = ({ value, max, label = 'Progress', step = 1 }: Props) => {
    const values = [];
    for (let i = 0; i <= max; i += 20) {
        values.push(i);
    }

    return (
        <div className="flex items-center justify-between w-full">
            {label && <span className="mr-4 text-sm">{label}</span>}
            <button className="p-2">
                <MdArrowBack className="text-xl" />
            </button>
            <div className="flex items-center w-full mx-2">
                <Slider max={max} step={step} value={[value]} className="w-full" />
                <div className="w-full text-center text-sm text-gray-500">{value}</div>
            </div>
            <button className="p-2">
                <MdArrowForward className="text-xl" />
            </button>
            <div className="flex justify-between mt-2">
                {values.map(val => (
                    <span key={val} className="text-xs text-gray-500">
                        {val}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ProgressSlider;
