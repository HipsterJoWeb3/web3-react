import React, {useMemo} from "react";
import AdminHeaderOption from "../sidebarOptions/AdminHeaderOption";

import AdminSimpleOption from "../sidebarOptions/AdminSimpleOption";
import AdminActionsOption from "../sidebarOptions/AdminActionsOption";


export interface ChapterSidebarProps {
    sidebarTitle: string,
    pageName: string,
    pageDescription: string,
    pageRoute: string,
    buttonData: any
}


const PagesSidebar: React.FC<ChapterSidebarProps> = ({sidebarTitle, pageDescription, pageRoute, pageName, buttonData}) => {




    return (
        <>
            <div className="admin-sidebar">
                <div className="admin-sidebar__options">
                    <AdminHeaderOption titleOption={sidebarTitle}/>
                    <AdminSimpleOption titleOption="Page name" text={pageName} />
                    <AdminSimpleOption titleOption="Page description" text={pageDescription} />
                    <AdminSimpleOption titleOption="Page route" text={pageRoute} />
                    <AdminActionsOption buttonData={buttonData} titleOption="Actions with the post"/>
                </div>
            </div>

        </>
    )
}

export default PagesSidebar