import {useRouter} from 'next/router'

export default function  Param(){
    const router = useRouter();
    const {params} = router.query;
    console.log(params)
    return <h1>Doc Page {params}</h1>

}