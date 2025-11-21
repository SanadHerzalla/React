export default function Section({title, children, ...props}){
    return(
        <section id="examples">
        <h2>{title}</h2>
        {children}
        </section>
    );
}