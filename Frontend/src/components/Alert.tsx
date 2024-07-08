
type Props = {
  alt: {
    type: 'success' | 'danger' | 'warning' | 'info';
    title: string;
    msg: string;
  } | null;
};
export  function Alert(props:Props) {
return (
    (props.alt) && <div className={`alert alert-${props.alt.type} alert-dismissible fade show`} role="alert">
    <strong>{props.alt.title}</strong> {props.alt.msg}
    <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
  )
}
