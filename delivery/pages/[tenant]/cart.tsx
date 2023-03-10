import styles from "../../styles/Cart.module.css";
import { GetServerSideProps } from 'next';
import Head from 'next/head';
import router, { Router, useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { Header } from '../../components/Header';
import { useAppContext } from '../../contexts/app';
import { useApi } from '../../lib/useApi';
import { Tenant } from '../../types/Tenant';
import { onValue, push, ref, remove, set } from "@firebase/database";
import { rtdb } from "../../firebase/rtdb";
import { Button1 } from "../../components/Button1";
import { auth } from "../../firebase/auth";
import { onAuthStateChanged } from "firebase/auth";



type Refeicao = {
    imagem: string;
    chave: string,
    nome: string,
    preco: number,
    qtCount: number,
}


const Cart = (data: Props) => {

    const { tenant, setTenant } = useAppContext();
    const [refeicao, setRefeicao] = useState<Refeicao[]>()
    let descricao:any = ''

    useEffect(() => {

        setTenant(data.tenant);

        onAuthStateChanged(auth, (user) => {

            if (user) {

                if (data.tenant.slug == 'delivery1') {
                    const lista = ref(rtdb, `Carrinho_1/${user.uid}`)

                    onValue(lista, (result) => {

                        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
                            return {
                                'chave': chave,
                                'imagem': valor.imagem,
                                'nome': valor.nome,
                                'preco': valor.preco,
                                'qtCount': valor.qtCount,

                            }
                        })

                        setRefeicao(Refeicoes)
                    }, { onlyOnce: true })

                }
                if (data.tenant.slug == 'delivery2') {
                    const lista = ref(rtdb, `Carrinho_2/${user.uid}`)

                    onValue(lista, (result) => {

                        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
                            return {
                                'chave': chave,
                                'imagem': valor.imagem,
                                'nome': valor.nome,
                                'preco': valor.preco,
                                'qtCount': valor.qtCount,

                            }
                        })

                        setRefeicao(Refeicoes)
                    }, { onlyOnce: true })

                }
                if (data.tenant.slug == 'delivery3') {
                    const lista = ref(rtdb, `Carrinho_3/${user.uid}`)

                    onValue(lista, (result) => {

                        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {
                            return {
                                'chave': chave,
                                'imagem': valor.imagem,
                                'nome': valor.nome,
                                'preco': valor.preco,
                                'qtCount': valor.qtCount,

                            }
                        })
                        setRefeicao(Refeicoes)
                    }, { onlyOnce: true })

                }
                if (data.tenant.slug == 'delivery4') {
                    const lista = ref(rtdb, `Carrinho_4/${user.uid}`)

                    onValue(lista, (result) => {

                        const Refeicoes = Object.entries<Refeicao>(result.val() ?? {}).map(([chave, valor]) => {

                            return {
                                'chave': chave,
                                'imagem': valor.imagem,
                                'nome': valor.nome,
                                'preco': valor.preco,
                                'qtCount': valor.qtCount,

                            }
                        })
                        setRefeicao(Refeicoes)
                    }, { onlyOnce: true })

                }
            }
        })

    }, []);




    async function deletarItem(idItem: string) {
        if (data.tenant.slug == 'delivery1') {
            set(ref(rtdb, `Carrinho_1/${auth.currentUser?.uid}/${idItem}`), {
                idItem: null
            })
            alert('Item removido!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery2') {
            set(ref(rtdb, `Carrinho_2/${auth.currentUser?.uid}/${idItem}`), {
                idItem: null
            })
            alert('Item removido!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery3') {
            set(ref(rtdb, `Carrinho_3/${auth.currentUser?.uid}/${idItem}`), {
                idItem: null
            })
            alert('Item removido!')
            window.location.reload()
        }
        if (data.tenant.slug == 'delivery4') {
            set(ref(rtdb, `Carrinho_4/${auth.currentUser?.uid}/${idItem}`), {
                idItem: null
            })
            alert('Item removido!')
            window.location.reload()
        }
    }

    function Pedido() {
        if (refeicao == undefined || refeicao == null || refeicao.length == 0) {
            alert('Nenhum item no Carrinho!!')
        } else {
            alert('Pedido Confirmado!!')
            router.push('/' + data.tenant.slug + '/address')
        }

    }

    return (
        <div className={styles.container}>
            <Head>
                <title> Carrinho | {data.tenant.name} </title>
            </Head>

            <div className={styles.headerArea} style={{ backgroundColor: data.tenant.primaryColor }}>
                <div className={styles.header}>
                    <Header
                        color={data.tenant.primaryColor}
                        backHref={'/' + data.tenant.slug}
                        invert
                    />
                </div>
            </div>

            <div className={styles.titleArea}>
                <div className={styles.title}> Carrinho | {tenant?.name}</div>
            </div>

            <div className={styles.line}></div>

            {refeicao?.map(itens => {
                return (
                    <div className={styles.container} key={itens.chave}>

                        <div className={styles.info}>
                            {itens.preco != undefined ?
                                <div className={styles.img}>
                                    <img src={itens.imagem} />
                                </div>
                                : undefined
                            }
                            <div className={styles.name}>{itens.nome != undefined ? itens.nome : undefined}</div>
                            <div className={styles.price} style={{ color: data.tenant.primaryColor }}><strong> R$ {itens.preco != undefined ? (itens.preco / itens.qtCount).toFixed(2) : undefined}</strong></div>
                            <div className={styles.price2}
                                style={{ color: data.tenant.primaryColor }}
                            ><strong>R$ {itens.preco != undefined ? itens.preco.toFixed(2) : ''}</strong></div>
                            <div className={styles.qtd}>{itens.qtCount != undefined ? itens.qtCount : undefined}</div>

                            {itens.preco != undefined ? <div className={styles.buttonDel} onClick={() => deletarItem(itens.chave)}
                                style={{ backgroundColor: data.tenant.primaryColor }}
                            ><strong>X</strong></div> : undefined}
                        </div>
                    </div>

                )
            })}

            <div className={styles.line2}></div>

            <div className={styles.button}>
                <Button1
                    color={data.tenant.primaryColor}
                    label="Concluir Pedido"
                    fill
                    onClick={Pedido}
                />
            </div>

        </div>
    );
}

export default Cart;

// Fun????o usada para pegar os tenants/estabelecimentos existentes no app, redirecionando para as urls dos mesmos.
type Props = {
    tenant: Tenant
}

export const getServerSideProps: GetServerSideProps = async (context) => {
    const { tenant: tenantSlug } = context.query;
    const api = useApi(tenantSlug as string);

    const tenant = await api.getTenant();

    // Selecionando o tenant
    if (!tenant) {
        return { redirect: { destination: '/', permanent: false } }
    } // Bloqueando o acesso a tenants/estabelecimentos que n??o existem e voltando pra pagina inicial.


    return {
        props: {
            tenant,

        }
    }

}
