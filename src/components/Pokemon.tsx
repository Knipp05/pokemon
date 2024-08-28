export default function Pokemon(props: any) {
  return (
    <div>
      <h2>{props.pokemon.name}</h2>
      <img src={props.pokemon.imgUrl} />
    </div>
  );
}
