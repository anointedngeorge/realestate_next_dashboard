import Link from "next/link";


interface Properties {
  title: string;
  link: string;
  classname?: string;
  onclick?: (event:React.MouseEvent<HTMLAnchorElement>) => void,

}

interface DataInterface {
  heading: string;
  linkpath?: string;
  is_group?:boolean,
  content?: Properties[];
}

export const LineTitle: React.FC<DataInterface> = (props) => {
  const parentUrl = '/admin';
  
  return (
    <div className="flex flex-row place-items-center place-content-between max-w-full max-sm:overflow-auto">
      <div>
        <h3 className="font-inter text-lg text-left font-bold">
          {props.heading}
        </h3>
      </div>
      <div>
        <code>
          {props.is_group? (
            <>
              <Link className="btn-link" href={parentUrl}>Home</Link>
              /
            </>
          ) : ''}
          {props.content?.map((item, index) => (
            <span key={`little_id_${index}`}>
              <Link onClick={item.onclick} className={item.classname? item.classname : 'btn-link'} href={`${parentUrl}/${item.link}`}>{item.title}</Link>
            </span>
          ))}
        </code>
      </div>
    </div>
  );
};
    