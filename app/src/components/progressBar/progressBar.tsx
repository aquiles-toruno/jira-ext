import classNames from "classnames";
import { ProgressBarProps } from "./progressBar.props";

const bgcMap = {
    default: 'bg-gray-200',
    info: 'bg-blue-600',
    success: 'bg-green-600',
    warning: 'bg-yellow-600',
    error: 'bg-red-600'
}

export default function ProgressBar({ progressValue, color = 'info', bgcolor = 'default', title = '', bgTitle = '' }: ProgressBarProps) {
    return (
        <div title={bgTitle} className={classNames(bgcMap[bgcolor], 'w-full h-2.5 dark:bg-gray-700')}>
            <div title={title} className={classNames(bgcMap[color], 'h-2.5')} style={{ width: `${progressValue}%` }}></div>
        </div>
    )
}