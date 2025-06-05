# Aplikacja wypożyczalni łodzi

Projekt aplikacji webowej służącej do przeglądania, dodawania oraz rezerwowania łodzi. Aplikacja została stworzona z wykorzystaniem technologii Django (REST API) po stronie backendu oraz React po stronie frontendowej.

## Technologie

- Backend: Django, Django REST Framework
- Frontend: React (create-react-app)
- Autoryzacja: JWT (SimpleJWT)
- Baza danych: SQLite (domyślna Django)
- Stylizacja: CSS (kolorystyka żeglarska: biały, błękit, granat)
- Panel administracyjny: Django Admin

## Główne funkcjonalności

### Użytkownik
- Rejestracja i logowanie (JWT)
- Przeglądanie dostępnych łodzi
- Rezerwacja łodzi w wybranym terminie (na doby)
- Automatyczne obliczanie kosztu rezerwacji
- Blokada rezerwacji łodzi na ten sam termin
- Historia swoich rezerwacji
- Możliwość usunięcia swojej rezerwacji, jeśli jeszcze się nie rozpoczęła

### Administrator (superuser)
- Dodawanie, edytowanie i usuwanie łodzi
- Podgląd wszystkich rezerwacji użytkowników
- Możliwość usuwania rezerwacji dowolnego użytkownika
- Panel admina Django do zarządzania użytkownikami, łodziami i rezerwacjami

## Uruchomienie projektu lokalnie

### 1. Klonowanie repozytorium
```bash
git clone https://github.com/Mikolaj420/lodzie.git
cd lodzie
```

### 2. Uruchomienie backendu (Django)
```bash
cd backend  # lub katalog, w którym jest manage.py
python manage.py migrate
python manage.py createsuperuser  # utwórz konto administratora
python manage.py runserver
```

### 3. Uruchomienie frontend (React)
```bash
cd frontend
npm install
npm start
```

Otwórz przeglądarkę i przejdź do http://localhost:3000

## Dane testowe

Aby zalogować się jako administrator, użyj konta utworzonego wcześniej przez `createsuperuser`. Możesz też zarejestrować się jako zwykły użytkownik przez formularz na stronie.

## Uwagi

- Rezerwacje dokonywane są na dni pełne (data od - data do).
- Nie można dokonać rezerwacji w przeszłości ani z datą końcową wcześniejszą niż początkowa.
- System uniemożliwia rezerwację tej samej łodzi w tym samym terminie przez różnych użytkowników.
- Użytkownicy mogą usuwać tylko swoje rezerwacje, jeśli nie rozpoczęły się jeszcze.
- Administrator widzi pełną listę wszystkich rezerwacji i może je usuwać.

## Autor

Mikołaj Schubert  
3. rok Informatyki  
Projekt zaliczeniowy z przedmiotu Programowanie zaawansowane – 2025
