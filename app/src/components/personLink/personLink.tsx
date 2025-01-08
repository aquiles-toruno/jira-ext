import { PersonLinkProperties } from "./personLink.props";
import clsx from 'classnames';

export default function PersonLink({ label, url, classNames }: PersonLinkProperties) {
    const defaultClassName = 'text-blue-600';
    const combinedClassNames = clsx(defaultClassName, classNames);

    return <a className={combinedClassNames} href={url} > {label}</a>
}