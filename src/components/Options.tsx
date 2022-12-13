import MyButton from '../UI/buttons/MyButton'
import Grid from '../assets/iconsComponent/Grid'
import List from '../assets/iconsComponent/List'
import Tag from '../assets/iconsComponent/Tag'
import GroupButtons from './GroupButtons'
import {tagsData} from "../redux/tags/slice";
import React, {useMemo} from "react";
import {useSelector} from "react-redux";


export interface OptionsProps {
  orientation: string,
  setOrientation: any
}

const Options: React.FC<OptionsProps> = ({orientation, setOrientation}) => {



  const {tags} = useSelector(tagsData)

  const groupButtonData = useMemo(() => {
    return tags.map(({value}: {value: any}) => {
      return {
        text: `#${value}`,
        to: `/posts?tags=${value}`,
        Icon: Tag
      }
    })
  }, [tags])


  return (
    <div className="options">
      <div className="options-item">
        <div className="options-label">Orientation</div>
        <div className="options-buttons d-flex">
          <MyButton active={orientation === 'grid'} setValue={setOrientation} value={'grid'}>
            <Grid/>
            <span>Grid</span>
          </MyButton>
          <MyButton active={orientation === 'list'} setValue={setOrientation} value={'list'}>
            <List/>
            <span>List</span>
          </MyButton>
        </div>
      </div>

      <div className="options-item options-tags">
        <div className="options-label">Top tags</div>
        <GroupButtons groupButtonData={groupButtonData} />
      </div>
    </div>
  )
}

export default Options
