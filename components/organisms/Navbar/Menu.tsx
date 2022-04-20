import Link from 'next/link';
import cx from 'classnames';

interface PropsMenu {
    title: string;
    active?: boolean;
    href: string;
}

export default function Menu(props: Partial<PropsMenu>) {
  const { title, active, href = '/' } = props;

  const classTitle = cx({
    'nav-link': true,
    active,
  });

  return (
    <li className="nav-item my-auto">
        <Link href={href}>
            <a className={classTitle} aria-current="page" href="#">{title}</a>
        </Link>
    </li>
  );
}
