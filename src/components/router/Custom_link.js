import React from 'react';
import { Link, useMatch, useResolvedPath } from 'react-router-dom';

export default function CustomLink({children, to, ...props}) {

    const resolve = useResolvedPath(to);
    const match = useMatch({path:resolve.pathname, end:true});
  return (
    <div>
        <Link to={to} {...props} style={{ fontWeight:match?"bolder":'' }}>
         {children}
      </Link>
    </div>
      
  )
}
