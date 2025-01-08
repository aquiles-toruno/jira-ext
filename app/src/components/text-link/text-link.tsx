import { TextLinkProperties } from "./text-link-props";
import "./text-link.css";

export default function TextLink({ text }: TextLinkProperties) {
    return <p className="text-link">{text}</p>
}