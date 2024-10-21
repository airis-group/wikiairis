import axios from 'axios'
import {useEffect, useState} from 'react'

const GithubCompiler = () => {
    const [datas, setDatas] = useState([])
    const url = 'https://raw.githubusercontent.com/RiaGusmita/E-IndQNER/refs/heads/main/al-quran-dataset-formatted/chapter_041.json?token=GHSAT0AAAAAACVHJBI2Y2ERXPFRWAKE6ULKZYTIDAQ';
    const getDatas = async () => {
        axios.get(url)
            .then(response => {
                console.log(response.data);
            })
            .catch(error => {
                console.error('Error fetching the file:', error);
            });
    }

    useEffect(() => {
        getDatas()
    },[])
  return (
    <div>GithubCompiler</div>
  )
}

export default GithubCompiler