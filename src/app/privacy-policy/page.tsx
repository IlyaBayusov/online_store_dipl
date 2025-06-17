import React from "react";

export default function PrivacyPolicy() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <h1 className="text-3xl font-bold mb-6">Политика конфиденциальности</h1>

      <div className="space-y-6 text-gray-700">
        <section>
          <h2 className="text-xl font-semibold mb-3">1. Общие положения</h2>
          <p className="mb-4">
            Настоящая политика конфиденциальности определяет порядок обработки и
            защиты персональных данных интернет-магазина.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            2. Сбор персональных данных
          </h2>
          <p className="mb-4">
            При регистрации на сайте мы собираем следующие персональные данные:
          </p>
          <ul className="list-disc pl-6 mb-4">
            <li>Имя и фамилия</li>
            <li>Email адрес</li>
            <li>Логин</li>
            <li>Пароль</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            3. Использование персональных данных
          </h2>
          <p className="mb-4">Мы используем ваши персональные данные для:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Обработки и выполнения ваших заказов</li>
            <li>Предоставления доступа к личному кабинету</li>
            <li>Отправки уведомлений о статусе заказа</li>
            <li>Улучшения качества обслуживания</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            4. Защита персональных данных
          </h2>
          <p className="mb-4">
            Мы принимаем необходимые правовые, организационные и технические
            меры для защиты ваших персональных данных от неправомерного или
            случайного доступа к ним, уничтожения, изменения, блокирования,
            копирования, предоставления, распространения, а также от иных
            неправомерных действий в отношении персональных данных.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">
            5. Передача персональных данных
          </h2>
          <p className="mb-4">
            Мы не передаем ваши персональные данные третьим лицам, за
            исключением случаев, предусмотренных законодательством Республики
            Беларусь.
          </p>
        </section>

        <section>
          <h2 className="text-xl font-semibold mb-3">6. Ваши права</h2>
          <p className="mb-4">Вы имеете право на:</p>
          <ul className="list-disc pl-6 mb-4">
            <li>Доступ к своим персональным данным</li>
            <li>Уточнение своих персональных данных</li>
            <li>Блокирование или уничтожение своих персональных данных</li>
            <li>Отзыв согласия на обработку персональных данных</li>
          </ul>
        </section>
      </div>
    </div>
  );
}
