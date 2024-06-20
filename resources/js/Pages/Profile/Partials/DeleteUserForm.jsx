import { useRef, useState } from 'react';
import DangerButton from '@/Components/DangerButton';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import Modal from '@/Components/Modal';
import SecondaryButton from '@/Components/SecondaryButton';
import TextInput from '@/Components/TextInput';
import { useForm } from '@inertiajs/react';

export default function DeleteUserForm({ className = '' }) {
    const [confirmingUserDeletion, setConfirmingUserDeletion] = useState(false);
    const passwordInput = useRef();

    const {
        data,
        setData,
        delete: destroy,
        processing,
        reset,
        errors,
    } = useForm({
        password: '',
    });

    const confirmUserDeletion = () => {
        setConfirmingUserDeletion(true);
    };

    const deleteUser = (e) => {
        e.preventDefault();

        destroy(route('profile.destroy'), {
            preserveScroll: true,
            onSuccess: () => closeModal(),
            onError: () => passwordInput.current.focus(),
            onFinish: () => reset(),
        });
    };

    const closeModal = () => {
        setConfirmingUserDeletion(false);

        reset();
    };

    return (
        <section className={`space-y-6 ${className}`}>
            <header>
                <h2 className="text-lg font-medium text-white">Deletar conta</h2>

                <p className="mt-1 text-sm text-gray-300">
                Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Antes
                excluir sua conta, baixe quaisquer dados ou informações que você deseja reter.
                </p>
            </header>

            <DangerButton onClick={confirmUserDeletion}>Deletar conta</DangerButton>

            <Modal show={confirmingUserDeletion} onClose={closeModal}>
                <form onSubmit={deleteUser} className="p-6">
                    <h2 className="text-lg font-medium text-gray-300">
                    Deseja remover? você deseja excluir sua conta?
                    </h2>

                    <p className="mt-1 text-sm text-gray-300">
                    Depois que sua conta for excluída, todos os seus recursos e dados serão excluídos permanentemente. Por favor
                    digite sua senha para confirmar que deseja excluir permanentemente sua conta.
                    </p>

                    <div className="mt-6">
                        <InputLabel htmlFor="password" value="Senha" className="sr-only" />

                        <TextInput
                            id="password"
                            type="password"
                            name="password"
                            ref={passwordInput}
                            value={data.password}
                            onChange={(e) => setData('password', e.target.value)}
                            className="mt-1 block w-3/4"
                            isFocused
                            placeholder="Senha"
                        />

                        <InputError message={errors.password} className="mt-2" />
                    </div>

                    <div className="mt-6 flex justify-end">
                        <SecondaryButton onClick={closeModal}>Cancelarar</SecondaryButton>

                        <DangerButton className="ms-3" disabled={processing}>
                            Deletar Conta
                        </DangerButton>
                    </div>
                </form>
            </Modal>
        </section>
    );
}
