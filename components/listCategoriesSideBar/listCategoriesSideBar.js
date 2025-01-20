import Link from "next/link";

export default function ListCategoriesSideBar({ categories }) {
  return (
    <ul>
      {categories.map((category) => (
        <li key={category.id}>
          <Link href={`/category/${category.id}`}>
            {category.nome}
          </Link>
        </li>
      ))}
    </ul>
  );
}