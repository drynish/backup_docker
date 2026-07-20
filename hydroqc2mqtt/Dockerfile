FROM registry.gitlab.com/hydroqc/hydroqc2mqtt:latest

# Fix issue #65 : champs DPC absents pour tarif Flex D première année
# https://gitlab.com/hydroqc/hydroqc/-/work_items/65
COPY patch.py /tmp/patch.py
RUN python3 /tmp/patch.py
